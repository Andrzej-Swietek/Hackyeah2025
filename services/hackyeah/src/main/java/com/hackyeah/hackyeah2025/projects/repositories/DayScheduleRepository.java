package com.hackyeah.hackyeah2025.projects.repositories;

import com.hackyeah.hackyeah2025.projects.entities.DaySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Date;
import java.util.List;

public interface DayScheduleRepository extends JpaRepository<DaySchedule, Long> {

    @Query("SELECT d FROM Project p JOIN p.plan d WHERE p.id = :projectId")
    List<DaySchedule> getDaySchedulesByProjectId(Long projectId);

    List<DaySchedule> findByAccommodationId(Long accommodationId);

    List<DaySchedule> findByDate(Date date);

    List<DaySchedule> findByAccommodationIdAndDate(Long accommodationId, Date date);
}
