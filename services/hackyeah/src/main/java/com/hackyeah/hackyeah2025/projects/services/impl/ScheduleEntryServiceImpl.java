package com.hackyeah.hackyeah2025.projects.services.impl;

import com.hackyeah.hackyeah2025.projects.entities.ScheduleEntry;
import com.hackyeah.hackyeah2025.projects.entities.Site;
import com.hackyeah.hackyeah2025.projects.repositories.ScheduleEntryRepository;
import com.hackyeah.hackyeah2025.projects.requests.ScheduleEntryRequest;
import com.hackyeah.hackyeah2025.projects.services.ScheduleEntryService;
import com.hackyeah.hackyeah2025.projects.services.SiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleEntryServiceImpl implements ScheduleEntryService {

    private final ScheduleEntryRepository scheduleEntryRepository;
    private final SiteService siteService;

    @Override
    @Transactional
    public ScheduleEntry createScheduleEntry(ScheduleEntryRequest request) {

        Site site = siteService.createSite(request.site());

        ScheduleEntry entry = ScheduleEntry.builder()
                .site(site)
                .startDate(request.startDate())
                .build();

        return scheduleEntryRepository.save(entry);

    }

    @Override
    public ScheduleEntry updateScheduleEntry(Long id, ScheduleEntryRequest request) {

        ScheduleEntry existing = scheduleEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ScheduleEntry not found with id " + id));

        Site site = siteService.updateSite(existing.getSite().getId(), request.site());
        existing.setStartDate(request.startDate());

        return scheduleEntryRepository.save(existing);
    }

    @Override
    public void deleteScheduleEntry(Long id) {
        scheduleEntryRepository.deleteById(id);
    }

    @Override
    public Optional<ScheduleEntry> getScheduleEntryById(Long id) {
        return scheduleEntryRepository.findById(id);
    }
}
