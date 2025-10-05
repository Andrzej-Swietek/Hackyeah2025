package com.hackyeah.hackyeah2025.ai;

import com.hackyeah.hackyeah2025.projects.entities.ScheduleEntry;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ScheduleGenerationResponse {
    List<ScheduleEntry> schedule;
}
