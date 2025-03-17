package me.huynhducphu.zschool_backend.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

/**
 * Admin 2/27/2025
 **/
public class AuditorAwareImpl implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated())
            return Optional.of("ANONYMOUS_USER");
        System.out.println(authentication.getPrincipal());
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails)
            return Optional.of(((UserDetails) principal).getUsername());

        return Optional.of("ADMIN");
    }
}
