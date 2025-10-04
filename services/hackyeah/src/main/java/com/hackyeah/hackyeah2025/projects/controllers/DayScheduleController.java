package com.hackyeah.hackyeah2025.projects.controllers;

import com.hackyeah.hackyeah2025.projects.entities.DaySchedule;
import com.hackyeah.hackyeah2025.projects.requests.DayScheduleRequest;
import com.hackyeah.hackyeah2025.projects.services.DayScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/day-schedules")
@RequiredArgsConstructor
public class DayScheduleController {

    private final DayScheduleService service;

    @PostMapping
    public ResponseEntity<DaySchedule> create(@RequestBody DayScheduleRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @GetMapping
    public ResponseEntity<Page<DaySchedule>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(
                service.getAll(PageRequest.of(page, size))
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<DaySchedule> getById(@PathVariable Long id) {
        return ResponseEntity.ok(
                service.getById(id)
                        .orElseThrow(() -> new RuntimeException("DaySchedule not found"))
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<DaySchedule> update(@PathVariable Long id, @RequestBody DayScheduleRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-accommodation/{accommodationId}")
    public ResponseEntity<List<DaySchedule>> getByAccommodation(@PathVariable Long accommodationId) {
        return ResponseEntity.ok(service.getByAccommodation(accommodationId));
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<DaySchedule>> getByDate(@RequestParam Date date) {
        return ResponseEntity.ok(service.getByDate(date));
    }

    @GetMapping("/by-plan/{projectId}")
    public ResponseEntity<List<DaySchedule>> getByPlanId(@PathVariable Long projectId) {
        List<DaySchedule> schedules = service.getByPlanId(projectId);
        return ResponseEntity.ok(schedules);
    }
}
