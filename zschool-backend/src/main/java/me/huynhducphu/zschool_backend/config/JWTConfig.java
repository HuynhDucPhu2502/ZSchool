package me.huynhducphu.zschool_backend.config;

import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Admin 2/23/2025
 **/
@Configuration
public class JWTConfig {
    private final String secretKey = "HDP-DEP-TRAI";

    @Bean
    public Algorithm algorithm() {
        return Algorithm.HMAC256(secretKey.getBytes());
    }
}
