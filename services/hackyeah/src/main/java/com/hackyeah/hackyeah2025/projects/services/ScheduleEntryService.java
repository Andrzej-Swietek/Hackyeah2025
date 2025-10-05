package com.hackyeah.hackyeah2025.projects.services;

import com.hackyeah.hackyeah2025.projects.entities.ScheduleEntry;
import com.hackyeah.hackyeah2025.projects.requests.ScheduleEntryRequest;

import java.util.Optional;

public interface ScheduleEntryService {
    ScheduleEntry createScheduleEntry(ScheduleEntryRequest scheduleEntryRequest);
    ScheduleEntry updateScheduleEntry(Long id, ScheduleEntryRequest scheduleEntryRequest);
    void deleteScheduleEntry(Long id);
    Optional<ScheduleEntry> getScheduleEntryById(Long id);

}
