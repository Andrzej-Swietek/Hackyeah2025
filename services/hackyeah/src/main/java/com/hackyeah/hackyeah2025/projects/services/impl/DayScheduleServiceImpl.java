package com.hackyeah.hackyeah2025.projects.services.impl;

import com.hackyeah.hackyeah2025.projects.entities.DaySchedule;
import com.hackyeah.hackyeah2025.projects.entities.ScheduleEntry;
import com.hackyeah.hackyeah2025.projects.entities.Site;
import com.hackyeah.hackyeah2025.projects.repositories.AccommodationRepository;
import com.hackyeah.hackyeah2025.projects.repositories.DayScheduleRepository;
import com.hackyeah.hackyeah2025.projects.requests.CreateSiteRequest;
import com.hackyeah.hackyeah2025.projects.repositories.ProjectRepository;
import com.hackyeah.hackyeah2025.projects.requests.DayScheduleRequest;
import com.hackyeah.hackyeah2025.projects.requests.SiteRequest;
import com.hackyeah.hackyeah2025.projects.services.DayScheduleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DayScheduleServiceImpl implements DayScheduleService {
    private final DayScheduleRepository repository;
    private final AccommodationRepository accommodationRepository;
    private final ProjectRepository projectRepository;

    @Override
    @Transactional
    public DaySchedule create(DayScheduleRequest request) {
        var project = projectRepository.findById(request.projectId())
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        var accommodation = accommodationRepository.findById(request.accommodationId())
                .orElseThrow(() -> new IllegalArgumentException("Accommodation not found"));

        List<ScheduleEntry> entries = request.scheduleEntries().stream()
                .map(entryReq -> {
                    var siteReq = entryReq.site();
                    Site site = Site.builder()
                            .name(siteReq.name())
                            .description(siteReq.description())
                            .timeEstimateHours(siteReq.timeEstimateHours())
                            .costEstimate(siteReq.costEstimate())
                            .address(siteReq.address())
                            .link(siteReq.link())
                            .photosPaths(siteReq.photosPaths())
                            .geolocation(siteReq.geolocation())
                            .build();

                    return ScheduleEntry.builder()
                            .site(site)
                            .startDate(entryReq.startDate())
                            .build();
                })
                .collect(Collectors.toList());

        DaySchedule daySchedule = DaySchedule.builder()
                .date(request.date())
                .accommodation(accommodation)
                .scheduleEntries(entries)
                .build();

        project.getPlan().add(daySchedule);
        projectRepository.save(project);

        return repository.save(daySchedule);
    }

    @Override
    public Optional<DaySchedule> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public DaySchedule update(Long id, DayScheduleRequest request) {
        DaySchedule daySchedule = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("DaySchedule not found"));

        var accommodation = accommodationRepository.findById(request.accommodationId())
                .orElseThrow(() -> new IllegalArgumentException("Accommodation not found"));

        daySchedule.setDate(request.date());
        daySchedule.setAccommodation(accommodation);

        daySchedule.getScheduleEntries().clear();

        List<ScheduleEntry> entries = request.scheduleEntries().stream()
                .map(entryReq -> {
                    CreateSiteRequest siteReq = entryReq.site();
                    Site site = Site.builder()
                            .name(siteReq.name())
                            .description(siteReq.description())
                            .timeEstimateHours(siteReq.timeEstimateHours())
                            .costEstimate(siteReq.costEstimate())
                            .address(siteReq.address())
                            .link(siteReq.link())
                            .photosPaths(siteReq.photosPaths())
                            .geolocation(siteReq.geolocation())
                            .build();

                    return ScheduleEntry.builder()
                            .site(site)
                            .startDate(entryReq.startDate())
                            .build();
                })
                .toList();

        daySchedule.getScheduleEntries().addAll(entries);

        return repository.save(daySchedule);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Page<DaySchedule> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public List<DaySchedule> getByAccommodation(Long accommodationId) {
        return repository.findByAccommodationId(accommodationId);
    }

    @Override
    public List<DaySchedule> getByDate(Date date) {
        return repository.findByDate(date);
    }

    @Override
    public List<DaySchedule> getByPlanId(Long projectId) {
        return repository.getDaySchedulesByProjectId(projectId);
    }
}
