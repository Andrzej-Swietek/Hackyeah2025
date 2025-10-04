package com.hackyeah.hackyeah2025.projects.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(
        name = "site",
        indexes = {
                @Index(name = "idx_site_geolocation", columnList = "latitude, longitude")
        }
)
@EntityListeners(AuditingEntityListener.class)
public class Site {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double timeEstimateHours;

    private Double costEstimate;

    private Address address;

    private String link;

    private List<String> photosPaths;

    @Embedded
    private Geolocation geolocation;

    // private List<Option> options;
}
