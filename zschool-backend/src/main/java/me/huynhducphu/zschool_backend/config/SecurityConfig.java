package me.huynhducphu.zschool_backend.config;

import com.auth0.jwt.algorithms.Algorithm;
import me.huynhducphu.zschool_backend.filter.CustomAuthenticationFilter;
import me.huynhducphu.zschool_backend.filter.CustomAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Set;

/**
 * Admin 2/20/2025
 **/
@Configuration
public class SecurityConfig  {
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final Algorithm algorithm;

    private static final Set<String> EXCLUDED_PATHS = Set.of(
            "/login",
            "/api/contact/save",
            "/api/user/save"
    );

    @Autowired
    public SecurityConfig(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder,
            Algorithm algorithm
    ) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.algorithm = algorithm;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            AuthenticationManager authenticationManager
    ) throws Exception {

        http
                // CORS && CSRF
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)

                // Stateless Session ---> JWT Auth
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Form Login && HTTP Basic
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)

                // Authorization rules
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(EXCLUDED_PATHS.toArray(new String[0])).permitAll()
                        .anyRequest().authenticated()
                )

                // Custom Filer
                .addFilter(new CustomAuthenticationFilter(authenticationManager, algorithm))
                .addFilterBefore(
                        new CustomAuthorizationFilter(algorithm, userDetailsService),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authProvider);
    }



}
