package com.hackyeah.hackyeah2025.ai;

import lombok.Builder;

@Builder
public record TaskGenerationRequest (
    String description,
    Long columnId,
    int position
) {}