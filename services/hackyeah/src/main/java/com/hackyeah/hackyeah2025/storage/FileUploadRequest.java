package com.hackyeah.hackyeah2025.storage;

import org.springframework.web.multipart.MultipartFile;

public record FileUploadRequest(
        MultipartFile file,
        String destinationPath
) {
}
