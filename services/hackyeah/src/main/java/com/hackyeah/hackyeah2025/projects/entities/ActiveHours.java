package com.hackyeah.hackyeah2025.projects.entities;

import jakarta.persistence.Embeddable;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Embeddable
public class ActiveHours {
    private String startHour;
    private String endHour;
}
