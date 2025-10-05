package com.hackyeah.hackyeah2025.projects.requests;

import com.hackyeah.hackyeah2025.projects.entities.AccommodationType;
import com.hackyeah.hackyeah2025.projects.entities.Address;
import com.hackyeah.hackyeah2025.projects.entities.Geolocation;

public record AccommodationRequest(
        String name,
        Address address,
        Geolocation geolocation,
        AccommodationType accommodationType
) {
}
