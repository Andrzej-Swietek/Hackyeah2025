package com.hackyeah.hackyeah2025.projects.services;

import com.hackyeah.hackyeah2025.projects.entities.DaySchedule;
import com.hackyeah.hackyeah2025.projects.requests.DayScheduleRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface DayScheduleService {
    DaySchedule create(DayScheduleRequest request);

    Optional<DaySchedule> getById(Long id);

    DaySchedule update(Long id, DayScheduleRequest request);

    void delete(Long id);

    Page<DaySchedule> getAll(Pageable pageable);

    List<DaySchedule> getByAccommodation(Long accommodationId);

    List<DaySchedule> getByDate(Date date);

    List<DaySchedule> getByPlanId(Long projectId);
}
