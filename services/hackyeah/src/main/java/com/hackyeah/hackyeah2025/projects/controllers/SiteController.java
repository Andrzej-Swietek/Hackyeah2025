package com.hackyeah.hackyeah2025.projects.controllers;

import com.hackyeah.hackyeah2025.projects.entities.Site;
import com.hackyeah.hackyeah2025.projects.requests.CreateSiteRequest;
import com.hackyeah.hackyeah2025.projects.requests.SiteInRadiusRequest;
import com.hackyeah.hackyeah2025.projects.services.SiteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/sites")
public class SiteController {
    private final SiteService siteService;

    @PostMapping("/within-radius")
    public ResponseEntity<List<Site>> getSitesInRadius(@Valid @RequestBody SiteInRadiusRequest request) {
        List<Site> sites = siteService.findAllWithinRadius(
                request.latitude(),
                request.longitude(),
                request.radius()
        );
        return ResponseEntity.ok(sites);
    }

    @PostMapping
    public ResponseEntity<Site> createSite(@Valid @RequestBody CreateSiteRequest request) {
        Site createdSite = siteService.createSite(request);
        return ResponseEntity
                .created(URI.create("/api/v1/sites/" + createdSite.getId()))
                .body(createdSite);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Site> getSiteById(@PathVariable Long id) {
        return siteService.getSiteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSite(@PathVariable Long id) {
        siteService.deleteSite(id);
        return ResponseEntity.noContent().build();
    }

}
