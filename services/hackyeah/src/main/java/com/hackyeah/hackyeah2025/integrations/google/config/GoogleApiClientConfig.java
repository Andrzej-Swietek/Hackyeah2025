package com.hackyeah.hackyeah2025.integrations.google.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

public class GoogleApiClientConfig {
    @Data
    @Configuration
    @ConfigurationProperties(prefix = "google")
    public static class GoogleProperties {
        private String apiKey;
        private String baseUrl;
        private int searchRadius;
    }

    @Data
    @Configuration
    @ConfigurationProperties(prefix = "getyourguide")
    public static class GetYourGuideProperties {
        private String apiKey;
        private String baseUrl;
    }
}
