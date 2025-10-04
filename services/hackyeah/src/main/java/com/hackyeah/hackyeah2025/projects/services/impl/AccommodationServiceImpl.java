package com.hackyeah.hackyeah2025.projects.services.impl;

import com.hackyeah.hackyeah2025.projects.entities.Accommodation;
import com.hackyeah.hackyeah2025.projects.repositories.AccommodationRepository;
import com.hackyeah.hackyeah2025.projects.services.AccommodationService;
import com.hackyeah.hackyeah2025.projects.requests.AccommodationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccommodationServiceImpl implements AccommodationService {

    private final AccommodationRepository accommodationRepository;

    @Override
    @Transactional
    public Accommodation createAccommodation(AccommodationRequest request) {
        Accommodation accommodation = Accommodation.builder()
                .name(request.name())
                .address(request.address())
                .geolocation(request.geolocation())
                .accommodationType(request.accommodationType())
                .build();
        return accommodationRepository.save(accommodation);
    }

    @Override
    @Transactional
    public Accommodation updateAccommodation(Long id, AccommodationRequest request) {
        Accommodation existing = accommodationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accommodation not found"));

        existing.setName(request.name());
        existing.setAddress(request.address());
        existing.setGeolocation(request.geolocation());
        existing.setAccommodationType(request.accommodationType());

        return accommodationRepository.save(existing);
    }

    @Override
    public Accommodation getAccommodation(Long id) {
        return accommodationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accommodation not found"));
    }

    @Override
    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteAccommodation(Long id) {
        accommodationRepository.deleteById(id);
    }
}
