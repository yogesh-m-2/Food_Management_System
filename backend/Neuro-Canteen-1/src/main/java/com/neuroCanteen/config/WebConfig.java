package com.neuroCanteen.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
// import org.springframework.beans.factory.annotation.Value;

@Configuration
public class WebConfig {

    // @Value("${server.address}")
    // private String serverAddress;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply CORS to all endpoints
                        .allowedOriginPatterns("*") // Allow frontend requests
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH") // Allowed HTTP methods
                        .allowCredentials(true); // Allow cookies, Authorization header
            }
        };
    }
}
