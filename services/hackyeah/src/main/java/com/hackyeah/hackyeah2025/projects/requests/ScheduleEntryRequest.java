package com.hackyeah.hackyeah2025.projects.requests;

import java.util.Date;

public record ScheduleEntryRequest(
        SiteRequest site,
        Date startDate
) {
}
