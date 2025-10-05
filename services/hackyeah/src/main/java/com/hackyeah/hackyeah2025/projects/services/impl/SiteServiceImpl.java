package com.hackyeah.hackyeah2025.projects.services.impl;

import com.hackyeah.hackyeah2025.projects.entities.Site;
import com.hackyeah.hackyeah2025.projects.repositories.SiteRepository;
import com.hackyeah.hackyeah2025.projects.requests.CreateSiteRequest;
import com.hackyeah.hackyeah2025.projects.services.SiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SiteServiceImpl implements SiteService {

    private final SiteRepository siteRepository;

    @Override
    public List<Site> findAllWithinRadius(Double latitude, Double longitude, Double radius) {
        return siteRepository.findSitesInRadius(latitude, longitude, radius);
    }

    @Override
    public Optional<Site> getSiteById(Long id) {
        return siteRepository.findById(id);
    }

    @Override
    public Site createSite(CreateSiteRequest createSiteRequest) {
        return siteRepository.save(
                Site.builder()
                        .name(createSiteRequest.name())
                        .description(createSiteRequest.description())
                        .timeEstimateHours(createSiteRequest.timeEstimateHours())
                        .costEstimate(createSiteRequest.costEstimate())
                        .address(createSiteRequest.address())
                        .link(createSiteRequest.link())
                        .photosPaths(createSiteRequest.photosPaths())
                        .geolocation(createSiteRequest.geolocation())
                        .build()
        );
    }

    @Override
    public Site updateSite(Long id, CreateSiteRequest site) {
        Site existingSite = siteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Site not found with id " + id));

        existingSite.setName(site.name());
        existingSite.setDescription(site.description());
        existingSite.setTimeEstimateHours(site.timeEstimateHours());
        existingSite.setCostEstimate(site.costEstimate());
        existingSite.setAddress(site.address());
        existingSite.setLink(site.link());
        existingSite.setPhotosPaths(site.photosPaths());
        existingSite.setGeolocation(site.geolocation());

        return siteRepository.save(existingSite);
    }

    @Override
    public void deleteSite(Long id) {
        siteRepository.deleteById(id);
    }
}
