package com.hackyeah.hackyeah2025.ai;

import lombok.Builder;

@Builder
public record EstimateResponse(
        Integer estimatedHours
) {
}