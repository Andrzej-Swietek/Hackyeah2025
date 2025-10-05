package com.hackyeah.hackyeah2025.integrations.google;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackyeah.hackyeah2025.integrations.google.config.GoogleApiClientConfig.*;
import com.hackyeah.hackyeah2025.integrations.google.responses.GetYourGuideResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class GetYourGuideClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final GetYourGuideProperties gygProps;

    /**
     * Searches GetYourGuide for an activity matching the name near a location (optionally).
     *
     * @param query the name or partial name of the attraction / activity
     * @param location optional, e.g. "50.0647,19.9450" or city name
     * @return optional GetYourGuideResponse if found
     */
    public Optional<GetYourGuideResponse> searchActivity(String query, String location) {
        try {
            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
            // If API supports location parameter, you can pass it. This is example.
            String url = String.format(
                    "%s/activities?query=%s&location=%s&api_key=%s",
                    gygProps.getBaseUrl(),
                    encodedQuery,
                    URLEncoder.encode(location, StandardCharsets.UTF_8),
                    gygProps.getApiKey()
            );

            String resp = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(resp);
            JsonNode results = root.path("results");

            if (results.isArray() && !results.isEmpty()) {
                JsonNode first = results.get(0);
                GetYourGuideResponse act = GetYourGuideResponse.builder()
                        .title(first.path("title").asText())
                        .price(first.path("price").path("amount").asDouble(0.0))
                        .currency(first.path("price").path("currency").asText())
                        .duration(first.path("duration").asText(null))
                        .bookingUrl(first.path("booking_link").asText(null))
                        .build();
                return Optional.of(act);
            }

        } catch (Exception e) {
            log.warn("Error searching GetYourGuide for query {} at location {}", query, location, e);
        }
        return Optional.empty();
    }
}

