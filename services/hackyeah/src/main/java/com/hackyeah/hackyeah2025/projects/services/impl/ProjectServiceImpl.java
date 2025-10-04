package com.hackyeah.hackyeah2025.projects.services.impl;

import com.hackyeah.hackyeah2025.projects.entities.*;
import com.hackyeah.hackyeah2025.projects.repositories.ProjectRepository;
import com.hackyeah.hackyeah2025.projects.repositories.TagRepository;
import com.hackyeah.hackyeah2025.projects.requests.ProjectRequest;
import com.hackyeah.hackyeah2025.projects.requests.ProjectSearchRequest;
import com.hackyeah.hackyeah2025.projects.services.ProjectService;
import com.hackyeah.hackyeah2025.responses.PaginatedResponse;
import jakarta.persistence.criteria.Join;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final TagRepository tagRepository;

    @Override
    @Transactional
    public Project createProject(ProjectRequest request) {
        List<Tag> tags = request.tagIds() != null
                ? tagRepository.findAllById(request.tagIds())
                : List.of();

        Project project = Project.builder()
                .name(request.name())
                .description(request.description())
                .numberOfTravelers(request.numberOfTravelers())
                .tripType(request.tripType())
                .numberOfEatingBreaks(request.numberOfEatingBreaks())
                .intensivenessLevel(request.intensivenessLevel())
                .activeHours(request.activeHours())
                .tags(tags)
                .participants(request.participants())
                .build();

        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public Project updateProject(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        List<Tag> tags = request.tagIds() != null
                ? tagRepository.findAllById(request.tagIds())
                : List.of();

        project.setName(request.name());
        project.setDescription(request.description());
        project.setNumberOfTravelers(request.numberOfTravelers());
        project.setTripType(request.tripType());
        project.setNumberOfEatingBreaks(request.numberOfEatingBreaks());
        project.setIntensivenessLevel(request.intensivenessLevel());
        project.setActiveHours(request.activeHours());
        project.setTags(tags);
        project.setParticipants(request.participants());

        return projectRepository.save(project);
    }

    @Override
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    @Override
    public List<Project> getProjectsByParticipant(String participantId) {
        return projectRepository.findByParticipantsContaining(participantId);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public PaginatedResponse<Project> getProjects(int page, int size) {
        Page<Project> projectPage = projectRepository.findAll(PageRequest.of(page, size));
        return PaginatedResponse.<Project>builder()
                .currentPage(projectPage.getNumber())
                .size(projectPage.getSize())
                .totalCount(projectPage.getTotalElements())
                .data(projectPage.getContent())
                .build();
    }
}
