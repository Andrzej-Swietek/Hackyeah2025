package com.hackyeah.hackyeah2025.ai.ports;

import com.hackyeah.hackyeah2025.projects.entities.DaySchedule;
import com.hackyeah.hackyeah2025.projects.entities.Project;
import com.hackyeah.hackyeah2025.projects.requests.DayScheduleRequest;
import com.hackyeah.hackyeah2025.projects.requests.ProjectRequest;

public interface AiScheduleGeneratorPort {
    Project generateScheduleForProjectProject(Project request);
    DaySchedule generateSingleScheduleEntry(Project request);
}