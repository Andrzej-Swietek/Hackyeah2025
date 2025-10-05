package com.hackyeah.hackyeah2025.ai.adapters;

import com.hackyeah.hackyeah2025.ai.ScheduleGenerationResponse;
import com.hackyeah.hackyeah2025.ai.ports.AiScheduleGeneratorPort;
import com.hackyeah.hackyeah2025.ai.prompts.GenerateAllProjectScheduleLLMPrompt;
import com.hackyeah.hackyeah2025.ai.prompts.GenerateDaySchedule;
import com.hackyeah.hackyeah2025.projects.entities.DaySchedule;
import com.hackyeah.hackyeah2025.projects.entities.Project;
import com.hackyeah.hackyeah2025.projects.requests.DayScheduleRequest;
import com.hackyeah.hackyeah2025.projects.requests.ScheduleEntryRequest;
import com.hackyeah.hackyeah2025.projects.requests.SiteRequest;
import com.hackyeah.hackyeah2025.projects.services.DayScheduleService;
import com.hackyeah.hackyeah2025.projects.services.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenAiScheduleGeneratorAdapter implements AiScheduleGeneratorPort {

    private final ChatClient chatClient;
    private final ProjectService projectService;
    private final DayScheduleService dayScheduleService;

    @Override
    public Optional<DaySchedule> generateSingleScheduleEntry(Project request) {
        Prompt prompt = new GenerateDaySchedule(request).getPrompt();
        log.info(prompt.toString());
        ScheduleGenerationResponse response = Optional.ofNullable(
                chatClient.prompt(prompt)
                        .call()
                        .entity(ScheduleGenerationResponse.class)
        ).orElseThrow(() -> new EntityNotFoundException("AI result Parsing failed"));

        String rawResponse = chatClient.prompt(prompt).call().content();
        log.info("AI raw response: {}", rawResponse);

        try {
            var responseDayScheduleEntries = response.getSchedule();
            DayScheduleRequest dayScheduleRequest = new DayScheduleRequest(
                    responseDayScheduleEntries.getFirst().getStartDate(),
                    1L, // Accommodation ID - to be set properly later on in the generation  process
                    responseDayScheduleEntries.stream().map(entry ->
                            new ScheduleEntryRequest(
                                    new SiteRequest(
                                            entry.getSite().getName(),
                                            entry.getSite().getDescription(),
                                            entry.getSite().getTimeEstimateHours(),
                                            entry.getSite().getCostEstimate(),
                                            entry.getSite().getAddress(),
                                            entry.getSite().getLink(),
                                            entry.getSite().getPhotosPaths(),
                                            entry.getSite().getGeolocation()
                                    ),
                                    entry.getStartDate()
                            )
                    ).toList(),
                    request.getId()
            );
            return Optional.of(dayScheduleService.create(dayScheduleRequest));
        } catch (Exception e) {
            log.error("AI schedule generation failed", e);
            return Optional.empty();
        }
    }

    @Transactional
    @Override
    public Optional<Project> generateScheduleForProjectProject(Project request) {
        Prompt prompt = new GenerateAllProjectScheduleLLMPrompt(request).getPrompt();
        log.info(prompt.toString());
        List<DaySchedule> response = Optional.ofNullable(
                chatClient.prompt(prompt)
                        .call()
                        .entity(new ParameterizedTypeReference<List<DaySchedule>>() {
                        })
        ).orElseThrow(() -> new EntityNotFoundException("AI result Parsing failed"));

        String rawResponse = chatClient.prompt(prompt).call().content();
        log.info("AI raw response: {}", rawResponse);

        try {
            IntStream.range(0, response.size()).forEach(i -> {
                DaySchedule daySchedule = response.get(i);
                dayScheduleService.create(
                        new DayScheduleRequest(
                                daySchedule.getDate(),
                                1L, // daySchedule.getAccommodation().getId(),
                                daySchedule.getScheduleEntries().stream().map(entry ->
                                        new ScheduleEntryRequest(
                                                new SiteRequest(
                                                        entry.getSite().getName(),
                                                        entry.getSite().getDescription(),
                                                        entry.getSite().getTimeEstimateHours(),
                                                        entry.getSite().getCostEstimate(),
                                                        entry.getSite().getAddress(),
                                                        entry.getSite().getLink(),
                                                        entry.getSite().getPhotosPaths(),
                                                        entry.getSite().getGeolocation()
                                                ),
                                                entry.getStartDate()
                                        )
                                ).toList(),
                                request.getId())
                );
            });
            return projectService.getProjectById(request.getId());
        } catch (Exception e) {
            log.error("AI schedule generation failed", e);
            return Optional.empty();
        }
    }
}
