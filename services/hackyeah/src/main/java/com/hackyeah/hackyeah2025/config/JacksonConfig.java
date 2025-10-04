package com.hackyeah.hackyeah2025.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();

        mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

//        mapper.registerSubtypes(
//                new NamedType(TaskCreated.class, "TaskCreated"),
//                new NamedType(TaskAssigned.class, "TaskAssigned"),
//                new NamedType(TaskClosed.class, "TaskClosed"),
//                new NamedType(TaskMoved.class, "TaskMoved")
//        );
        return mapper;
    }
}