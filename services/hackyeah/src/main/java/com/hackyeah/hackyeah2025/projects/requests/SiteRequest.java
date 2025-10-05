package com.hackyeah.hackyeah2025.projects.requests;

import com.hackyeah.hackyeah2025.projects.entities.Address;
import com.hackyeah.hackyeah2025.projects.entities.Geolocation;

import java.util.List;

public record SiteRequest(
        String name,
        String description,
        Double timeEstimateHours,
        Double costEstimate,
        Address address,
        String link,
        List<String> photosPaths,
        Geolocation geolocation
) {}
