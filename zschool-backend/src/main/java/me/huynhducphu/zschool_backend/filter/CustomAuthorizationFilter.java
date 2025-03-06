package me.huynhducphu.zschool_backend.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import me.huynhducphu.zschool_backend.model.Role;
import me.huynhducphu.zschool_backend.model.User;
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
            "/api/auth/register",
            "/api/auth/refresh"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestPath = request.getServletPath();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (EXCLUDED_PATHS.contains(requestPath)) {
            filterChain.doFilter(request, response);
            return;
        }

        Cookie accessTokenCookie = WebUtils.getCookie(request, "access_token");

        if (accessTokenCookie != null) {
            try {
                String token = accessTokenCookie.getValue();

                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(token);

                String username = decodedJWT.getSubject();
                User user = (User) userDetailsService.loadUserByUsername(username);
                Collection<Role> authorities = user.getRoles();

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(user, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                filterChain.doFilter(request, response);
            } catch (TokenExpiredException e) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value()); // 401
                response.getWriter().write("{\"message\": \"Access Token hết hạn, cần refresh token\"}");
            } catch (SignatureVerificationException e) { // JWT có chữ ký khác chương trình
                response.setStatus(HttpStatus.BAD_REQUEST.value()); // 400
                response.getWriter().write("{\"message\": \"Token có chữ ký sai\"}");
            } catch (JWTDecodeException e) { // JWT không đúng format
                response.setStatus(HttpStatus.BAD_REQUEST.value()); // 400
                response.getWriter().write("{\"message\": \"Token không hợp lệ\"}");
            } catch (Exception e) {
                response.setStatus(HttpStatus.BAD_REQUEST.value()); // 400
                response.getWriter().write("{\"message\": \"Không thể xác thực token\"}");
            }
        } else {
            response.setStatus(HttpStatus.UNAUTHORIZED.value()); // 401
            response.getWriter().write("{\"message\": \"Bạn chưa đăng nhập\"}");
        }
    }
}
