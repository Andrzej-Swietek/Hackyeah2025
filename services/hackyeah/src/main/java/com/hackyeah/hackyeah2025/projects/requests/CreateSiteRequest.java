package com.hackyeah.hackyeah2025.projects.requests;

import com.hackyeah.hackyeah2025.projects.entities.Address;
import com.hackyeah.hackyeah2025.projects.entities.Geolocation;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public record CreateSiteRequest(

        @NotBlank(message = "Name is required")
        String name,

        @Size(max = 500, message = "Description cannot exceed 500 characters")
        String description,

        @PositiveOrZero(message = "Time estimate must be zero or positive")
        Double timeEstimateHours,

        @PositiveOrZero(message = "Cost estimate must be zero or positive")
        Double costEstimate,

        Address address,

        @Pattern(
                regexp = "^(https?://.*)?$",
                message = "Link must be a valid URL"
        )
        String link,

        List<String> photosPaths,

        @NotNull(message = "Geolocation is required")
        @Valid
        Geolocation geolocation
) {}

