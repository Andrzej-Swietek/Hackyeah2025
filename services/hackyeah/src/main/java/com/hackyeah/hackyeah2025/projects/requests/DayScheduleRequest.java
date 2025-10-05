package com.hackyeah.hackyeah2025.projects.requests;

import lombok.Builder;

import java.util.Date;
import java.util.List;

public record DayScheduleRequest(
        Date date,
        Long accommodationId,
        List<ScheduleEntryRequest> scheduleEntries,
        Long projectId
) {}