package com.hackyeah.hackyeah2025.projects.services;

import com.hackyeah.hackyeah2025.projects.entities.Accommodation;
import com.hackyeah.hackyeah2025.projects.requests.AccommodationRequest;

import java.util.List;

public interface AccommodationService {
    Accommodation createAccommodation(AccommodationRequest request);
    Accommodation updateAccommodation(Long id, AccommodationRequest request);
    Accommodation getAccommodation(Long id);
    List<Accommodation> getAllAccommodations();
    void deleteAccommodation(Long id);
}
