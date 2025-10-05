package com.hackyeah.hackyeah2025.ai.prompts;

import com.hackyeah.hackyeah2025.projects.entities.Project;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.util.List;
import java.util.Map;

@Slf4j
public record GenerateDaySchedule(
        Project project
) implements LLMPrompt {

    private static final Resource generateScheduleSystemMessageResource = new ClassPathResource("prompts/generateScheduleSystemMessage.st");
    private static final Resource generateSingleSchedulePromptResource = new ClassPathResource("prompts/generateSingleSchedulePrompt.st");

    @Override
    public PromptTemplate getPromptTemplate() {
        return new PromptTemplate(generateSingleSchedulePromptResource);
    }

    @Override
    public Prompt getPrompt() {
        Map<String, Object> params = Map.of(
                "projectDescription", project.getDescription(),
                "name", project.getName(),
                "activeHours", project.getActiveHours(),
                "tags", project.getTags(),
                "numberOfTravelers", project.getNumberOfTravelers(),
                "tripType", project.getTripType(),
                "numberOfEatingBreaks", project.getNumberOfEatingBreaks(),
                "intensivenessLevel", project.getIntensivenessLevel(),
                "participants", project.getParticipants(),
                "plan", project.getPlan()
        );

        var systemMessage = new SystemMessage(generateScheduleSystemMessageResource);
        var userMessage = new PromptTemplate(generateSingleSchedulePromptResource)
                .create(params)
                .getContents();
        log.info("GEN prompt for {} tasks", userMessage);
        return new Prompt(List.of(systemMessage, new UserMessage(userMessage)));
    }
}
