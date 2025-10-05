package com.hackyeah.hackyeah2025.projects.repositories;

import com.hackyeah.hackyeah2025.projects.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {
    List<Project> findByParticipantsContaining(String participantId);
}

