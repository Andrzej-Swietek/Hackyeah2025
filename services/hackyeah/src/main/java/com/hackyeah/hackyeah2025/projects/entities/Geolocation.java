package com.hackyeah.hackyeah2025.projects.entities;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Geolocation {
    private Double latitude;
    private Double longitude;
}