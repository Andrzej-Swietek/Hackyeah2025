package com.hackyeah.hackyeah2025.projects.services;

import com.hackyeah.hackyeah2025.projects.entities.Site;
import com.hackyeah.hackyeah2025.projects.requests.CreateSiteRequest;

import java.util.List;
import java.util.Optional;

public interface SiteService {
    List<Site> findAllWithinRadius(Double longitude, Double latitude, Double radius);
    Optional<Site> getSiteById(Long id);
    Site createSite(CreateSiteRequest createSiteRequest);
    void deleteSite(Long id);
}
