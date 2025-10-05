package com.hackyeah.hackyeah2025.ai.ports;

import com.hackyeah.hackyeah2025.projects.entities.DaySchedule;
import com.hackyeah.hackyeah2025.projects.entities.Project;

import java.util.Optional;

public interface AiScheduleGeneratorPort {
    Optional<Project> generateScheduleForProjectProject(Project request);

    Optional<DaySchedule> generateSingleScheduleEntry(Project request);
}