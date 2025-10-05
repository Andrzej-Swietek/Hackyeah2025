package com.hackyeah.hackyeah2025.responses;

import java.util.Map;

public record ErrorResponse(Map<String, String> errors) {
}
