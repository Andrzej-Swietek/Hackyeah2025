package com.hackyeah.hackyeah2025.projects.controllers;

import com.hackyeah.hackyeah2025.ai.ports.AiScheduleGeneratorPort;
import com.hackyeah.hackyeah2025.exceptions.AIFailureException;
import com.hackyeah.hackyeah2025.projects.entities.DaySchedule;
import com.hackyeah.hackyeah2025.projects.entities.Project;
import com.hackyeah.hackyeah2025.projects.requests.ProjectRequest;
import com.hackyeah.hackyeah2025.projects.services.ProjectService;
import com.hackyeah.hackyeah2025.responses.PaginatedResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final AiScheduleGeneratorPort aiScheduleGeneratorPort;

    @GetMapping("/all/paginated")
    public PaginatedResponse<Project> getProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return projectService.getProjects(page, size);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/participant/{participantId}")
    public ResponseEntity<List<Project>> getProjectsByParticipant(@PathVariable String participantId) {
        return ResponseEntity.ok(projectService.getProjectsByParticipant(participantId));
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody ProjectRequest request) {
        Project project = projectService.createProject(request);
        return ResponseEntity.ok(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long id,
            @RequestBody ProjectRequest request
    ) {
        return ResponseEntity.ok(projectService.updateProject(id, request));
    }

    @PatchMapping("/{id}/add-participant")
    public ResponseEntity<Project> addParticipant(
            @PathVariable Long id,
            @RequestParam String participantId
    ) {
        return projectService.addParticipant(id, participantId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/generate-with-ai")
    public ResponseEntity<Project> generateProjectWithAI(@RequestBody Project request) {
        return aiScheduleGeneratorPort.generateScheduleForProjectProject(request)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new AIFailureException(List.of("AI failed to generate a project schedule.")));
    }

    @PostMapping("/generate-daily-schedule-with-ai")
    public ResponseEntity<DaySchedule> generateSingleScheduleEntryWithAI(@RequestBody Project request) {
        return aiScheduleGeneratorPort.generateSingleScheduleEntry(request)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new AIFailureException(List.of("AI failed to generate a daily schedule entry.")));
    }
}
