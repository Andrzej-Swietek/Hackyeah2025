package com.hackyeah.hackyeah2025.projects.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Integer numberOfTravelers;

    private TripType tripType;

    private Integer numberOfEatingBreaks;

    private Integer intensivenessLevel;

    private ActiveHours activeHours;

//    private List<TravelPreferences> preferences; // TODO: ISSUE #XXX

    @ManyToMany
    private List<Tag> tags;

    @OneToMany(cascade = CascadeType.ALL)
    private List<DaySchedule> plan;

    /**
     * List of participant keycloak identifiers that share right to project
     */
    private List<String> participants;
}
