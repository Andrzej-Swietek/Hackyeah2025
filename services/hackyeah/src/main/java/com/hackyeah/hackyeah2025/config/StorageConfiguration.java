package com.hackyeah.hackyeah2025.config;

import com.hackyeah.hackyeah2025.storage.FileSystemStorage;
import com.hackyeah.hackyeah2025.storage.Storage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


@Configuration
public class StorageConfiguration {

    @Configuration
    @Profile("local")
    public static class LocalStorageConfig {
        @Bean(name = "localfile")
        public Storage storage() {
            return new FileSystemStorage();
        }
    }

}
