package com.hackyeah.hackyeah2025.projects.entities;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Address {
    private String street;
    private String city;
    private String country;
}
