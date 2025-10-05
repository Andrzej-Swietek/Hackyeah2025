package com.hackyeah.hackyeah2025.integrations.google.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetYourGuideResponse {
        private String title;
        private double price;
        private String currency;
        private String duration;
        private String bookingUrl;
}
