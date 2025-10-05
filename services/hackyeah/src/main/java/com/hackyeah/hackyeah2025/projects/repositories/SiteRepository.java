package com.hackyeah.hackyeah2025.projects.repositories;

import com.hackyeah.hackyeah2025.projects.entities.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SiteRepository extends JpaRepository<Site, Long> {
    @Query(value = """
        SELECT * FROM site s
        WHERE haversine_distance(:latitude, :longitude, s.latitude, s.longitude) <= :radius
    """, nativeQuery = true)
    List<Site> findSitesInRadius(
            @Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("radius") Double radius
    );

}
