package com.hackyeah.hackyeah2025.projects.requests;

import com.hackyeah.hackyeah2025.projects.entities.ActiveHours;
import com.hackyeah.hackyeah2025.projects.entities.TripType;

import java.util.List;

public record ProjectSearchRequest(
        String query,
        TripType tripType,
        ActiveHours activeHours,
        List<Long> tagIds,
        String participantId,
        Integer minTravelers,
        Integer maxTravelers,
        int page,
        int size
) {
}
