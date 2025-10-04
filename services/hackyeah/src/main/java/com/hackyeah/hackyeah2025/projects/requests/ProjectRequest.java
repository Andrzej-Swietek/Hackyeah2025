package com.hackyeah.hackyeah2025.projects.requests;

import com.hackyeah.hackyeah2025.projects.entities.ActiveHours;
import com.hackyeah.hackyeah2025.projects.entities.TripType;

import java.util.List;

public record ProjectRequest(
        String name,
        String description,
        Integer numberOfTravelers,
        TripType tripType,
        Integer numberOfEatingBreaks,
        Integer intensivenessLevel,
        ActiveHours activeHours,
        List<Long> tagIds,
        List<String> participants
) {}