package com.hackyeah.hackyeah2025.integrations.google;

import com.hackyeah.hackyeah2025.integrations.google.responses.GetYourGuideResponse;
import com.hackyeah.hackyeah2025.integrations.google.responses.PlaceInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/google-api")
@RequiredArgsConstructor
public class GoogleApiController {

    private final GoogleApiClient googleApiClient;
    private final GetYourGuideClient getYourGuideClient;

    /**
     * GET /api/places
     * Example: /api/places?lat=50.0647&lng=19.9450&radius=5000
     * Finds nearby tourist attractions and restaurants.
     */
    @GetMapping("/places")
    public List<PlaceInfo> getPlaces(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "5000") int radius
    ) {
        String coordinates = lat + "," + lng;
        var types = List.of("tourist_attraction", "restaurant");

        log.info("Fetching places for coordinates {} and radius {}", coordinates, radius);

        return googleApiClient.findPlaces(coordinates, radius, types);
    }

    /**
     * GET /api/tickets
     * Example: /api/tickets?name=Wawel%20Castle&location=Krakow
     * Searches GetYourGuide for ticket/booking info for a place.
     */
    @GetMapping("/tickets")
    public Optional<GetYourGuideResponse> getTickets(
            @RequestParam String name,
            @RequestParam(required = false, defaultValue = "") String location
    ) {
        log.info("Fetching ticket info for place '{}' near '{}'", name, location);
        return getYourGuideClient.searchActivity(name, location);
    }
}
