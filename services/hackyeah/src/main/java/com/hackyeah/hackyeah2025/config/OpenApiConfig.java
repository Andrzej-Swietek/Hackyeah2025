package com.hackyeah.hackyeah2025.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "API Documentation",
                version = "1.0",
                description = "Documentation for the API"
        )
)
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
//        Scopes scopes = new Scopes()
//                .addString("read", "Grants read access")
//                .addString("write", "Grants write access");
        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList("oauth2"))
                .components(new Components()
                        .addSecuritySchemes("oauth2",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.OAUTH2)
                                        .flows(new OAuthFlows()
                                                .authorizationCode(new OAuthFlow()
                                                        .authorizationUrl("http://localhost:9098/realms/hackyeah-project/protocol/openid-connect/auth")
                                                        .tokenUrl("http://localhost:9098/realms/hackyeah-project/protocol/openid-connect/token")
                                                        .scopes(new Scopes())
                                                )
                                        )
                        )
                );
    }
}