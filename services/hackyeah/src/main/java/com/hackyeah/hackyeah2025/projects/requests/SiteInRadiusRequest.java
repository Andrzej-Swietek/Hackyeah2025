package com.hackyeah.hackyeah2025.projects.requests;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SiteInRadiusRequest(

        @NotNull(message = "Latitude is required")
        @Min(value = -90, message = "Latitude must be greater than or equal to -90")
        @Max(value = 90, message = "Latitude must be less than or equal to 90")
        Double latitude,

        @NotNull(message = "Longitude is required")
        @Min(value = -180, message = "Longitude must be greater than or equal to -180")
        @Max(value = 180, message = "Longitude must be less than or equal to 180")
        Double longitude,

        @NotNull(message = "Radius is required")
        @Positive(message = "Radius must be greater than 0")
        Double radius
) {
}
