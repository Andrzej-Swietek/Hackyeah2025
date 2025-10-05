package com.hackyeah.hackyeah2025.integrations.google;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackyeah.hackyeah2025.integrations.google.config.GoogleApiClientConfig.*;
import com.hackyeah.hackyeah2025.integrations.google.responses.PlaceInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleApiClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper mapper;
    private final GoogleProperties googleConfig;

    /**
     * Finds places near the given coordinates (lat,lng).
     *
     * @param coordinates latitude,longitude string (e.g. "50.0647,19.9450")
     * @param radiusMeters search radius in meters
     * @param types list of place types, e.g. ["tourist_attraction", "restaurant"]
     */
    public List<PlaceInfo> findPlaces(String coordinates, int radiusMeters, List<String> types) {
        return types.stream()
                .flatMap(type -> fetchPlacesByType(coordinates, radiusMeters, type).stream())
                .toList();
    }

    private List<PlaceInfo> fetchPlacesByType(String coordinates, int radiusMeters, String type) {
        var results = new ArrayList<PlaceInfo>();

        try {
            var url = String.format(
                    "%s/place/nearbysearch/json?location=%s&radius=%d&type=%s&key=%s",
                    googleConfig.getBaseUrl(),
                    coordinates,
                    radiusMeters,
                    type,
                    googleConfig.getApiKey()
            );

            var response = restTemplate.getForObject(url, String.class);
            var nodes = mapper.readTree(response).path("results");

            for (JsonNode node : nodes) {
                var name = node.path("name").asText();
                var placeId = node.path("place_id").asText();

                var details = fetchPlaceDetails(placeId);
                details.setCategory(type);
                results.add(details);
            }

        } catch (Exception e) {
            log.error("Failed to fetch places for type {} near {}", type, coordinates, e);
        }

        return results;
    }

    private PlaceInfo fetchPlaceDetails(String placeId) {
        try {
            var url = String.format(
                    "%s/place/details/json?place_id=%s&fields=name,formatted_address,website,opening_hours,rating&key=%s",
                    googleConfig.getBaseUrl(),
                    placeId,
                    googleConfig.getApiKey()
            );

            var response = restTemplate.getForObject(url, String.class);
            var result = mapper.readTree(response).path("result");

            return PlaceInfo.builder()
                    .name(result.path("name").asText())
                    .address(result.path("formatted_address").asText())
                    .website(result.path("website").asText(null))
                    .openingHours(result.path("opening_hours").path("weekday_text").toString())
                    .rating(result.path("rating").asDouble(0.0))
                    .build();

        } catch (Exception e) {
            log.warn("Could not fetch details for placeId={}", placeId, e);
            return PlaceInfo.builder().build();
        }
    }
}