package com.hackyeah.hackyeah2025.integrations.google.responses;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PlaceInfo {
    private String name;
    private String address;
    private String website;
    private String openingHours;
    private double rating;
    private String category;
}