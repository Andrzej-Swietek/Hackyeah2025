package com.hackyeah.hackyeah2025.projects.controllers;

import com.hackyeah.hackyeah2025.projects.entities.ScheduleEntry;
import com.hackyeah.hackyeah2025.projects.requests.ScheduleEntryRequest;
import com.hackyeah.hackyeah2025.projects.services.ScheduleEntryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/schedule-entry")
public class ScheduleEntryController {
    private final ScheduleEntryService scheduleEntryService;

    @PostMapping
    public ResponseEntity<ScheduleEntry> createScheduleEntry(
            @Valid @RequestBody ScheduleEntryRequest request
    ) {
        ScheduleEntry created = scheduleEntryService.createScheduleEntry(request);
        return ResponseEntity
                .created(URI.create("/api/v1/schedule-entry/" + created.getId()))
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleEntry> updateScheduleEntry(
            @PathVariable Long id,
            @Valid @RequestBody ScheduleEntryRequest request
    ) {
        ScheduleEntry updated = scheduleEntryService.updateScheduleEntry(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleEntry> getScheduleEntryById(@PathVariable Long id) {
        Optional<ScheduleEntry> entry = scheduleEntryService.getScheduleEntryById(id);
        return entry.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScheduleEntry(@PathVariable Long id) {
        scheduleEntryService.deleteScheduleEntry(id);
        return ResponseEntity.noContent().build();
    }

}
