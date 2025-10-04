package com.hackyeah.hackyeah2025.projects.services;


import com.hackyeah.hackyeah2025.projects.entities.Project;
import com.hackyeah.hackyeah2025.projects.requests.ProjectRequest;
import com.hackyeah.hackyeah2025.projects.requests.ProjectSearchRequest;
import com.hackyeah.hackyeah2025.responses.PaginatedResponse;

import java.util.List;
import java.util.Optional;

public interface ProjectService {
    Project createProject(ProjectRequest request);
    Project updateProject(Long id, ProjectRequest request);
    Optional<Project> getProjectById(Long id);
    List<Project> getProjectsByParticipant(String participantId);
    List<Project> getAllProjects();
    void deleteProject(Long id);
    PaginatedResponse<Project> getProjects(int page, int size);
    Optional<Project> addParticipant(Long id, String participantId);
}