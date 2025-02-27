package me.huynhducphu.zschool_backend.config;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

/**
 * Admin 2/27/2025
 **/
public class AuditorAwareImpl implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of("admin");
    }
}
