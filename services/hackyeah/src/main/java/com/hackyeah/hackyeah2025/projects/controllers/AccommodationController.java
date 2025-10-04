package com.hackyeah.hackyeah2025.projects.controllers;

import com.hackyeah.hackyeah2025.projects.entities.Accommodation;
import com.hackyeah.hackyeah2025.projects.services.AccommodationService;
import com.hackyeah.hackyeah2025.projects.requests.AccommodationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/accommodations")
@RequiredArgsConstructor
public class AccommodationController {

    private final AccommodationService accommodationService;

    @PostMapping
    public ResponseEntity<Accommodation> create(@RequestBody AccommodationRequest request) {
        Accommodation created = accommodationService.createAccommodation(request);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Accommodation> update(@PathVariable Long id, @RequestBody AccommodationRequest request) {
        Accommodation updated = accommodationService.updateAccommodation(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accommodation> get(@PathVariable Long id) {
        Accommodation accommodation = accommodationService.getAccommodation(id);
        return ResponseEntity.ok(accommodation);
    }

    @GetMapping
    public ResponseEntity<List<Accommodation>> getAll() {
        List<Accommodation> accommodations = accommodationService.getAllAccommodations();
        return ResponseEntity.ok(accommodations);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        accommodationService.deleteAccommodation(id);
        return ResponseEntity.noContent().build();
    }
}