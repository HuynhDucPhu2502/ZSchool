package me.huynhducphu.zschool_backend.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import me.huynhducphu.zschool_backend.model.Role;
import me.huynhducphu.zschool_backend.model.User;
import me.huynhducphu.zschool_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.*;

/**
 * Admin 2/23/2025
 **/
public class CustomAuthorizationFilter extends OncePerRequestFilter {
    private final Algorithm algorithm;
    private final UserDetailsService userDetailsService;

    @Autowired
    public CustomAuthorizationFilter(Algorithm algorithm, UserDetailsService userDetailsService) {
        this.algorithm = algorithm;
        this.userDetailsService = userDetailsService;
    }

    private static final Set<String> EXCLUDED_PATHS = Set.of(
            "/login",
            "/api/contact/save",
            "/api/user/save"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestPath = request.getServletPath();

        if (EXCLUDED_PATHS.contains(requestPath)) {
            filterChain.doFilter(request, response);
            return;
        }

        else {
            Cookie accessTokenCookie = WebUtils.getCookie(request, "access_token");

            if (accessTokenCookie != null) {
                try {
                    String token = accessTokenCookie.getValue();
                    System.out.println(token);

                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);

                    String username = decodedJWT.getSubject();
                    System.out.println(username);

                    User user = (User) userDetailsService.loadUserByUsername(username);
                    Collection<Role> authorities = user.getRoles();

                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                            new UsernamePasswordAuthenticationToken(user, null, authorities);

                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                } catch (Exception e) {
                    response.setStatus(HttpStatus.FORBIDDEN.value());

                    Map<String, String> error = new HashMap<>();
                    error.put("error_message", e.getMessage());
                    response.setContentType("application/json");
                    new ObjectMapper().writeValue(response.getOutputStream(), error);

                    return;
                }
            } else {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());

                Map<String, String> error = new HashMap<>();
                error.put("error_message", "Không có quyền truy cập");
                response.setContentType("application/json");
                new ObjectMapper().writeValue(response.getOutputStream(), error);

                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
