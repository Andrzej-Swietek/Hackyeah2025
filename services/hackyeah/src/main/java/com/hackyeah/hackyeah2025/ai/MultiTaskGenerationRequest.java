package com.hackyeah.hackyeah2025.ai;

import lombok.Builder;

@Builder
public record MultiTaskGenerationRequest (
        String description,
        Long columnId,
        int count
) {}