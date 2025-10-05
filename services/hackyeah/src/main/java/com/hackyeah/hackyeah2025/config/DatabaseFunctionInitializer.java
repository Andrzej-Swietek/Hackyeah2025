package com.hackyeah.hackyeah2025.config;

import jakarta.annotation.PostConstruct;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseFunctionInitializer {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseFunctionInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void createDistanceFunction() {
        jdbcTemplate.execute("""
            CREATE OR REPLACE FUNCTION haversine_distance(
                lat1 DOUBLE PRECISION,
                lon1 DOUBLE PRECISION,
                lat2 DOUBLE PRECISION,
                lon2 DOUBLE PRECISION
            )
            RETURNS DOUBLE PRECISION AS $$
            BEGIN
                RETURN 6371000 * acos(
                    cos(radians(lat1)) *
                    cos(radians(lat2)) *
                    cos(radians(lon2) - radians(lon1)) +
                    sin(radians(lat1)) *
                    sin(radians(lat2))
                );
            END;
            $$ LANGUAGE plpgsql IMMUTABLE;
        """);
    }
}
