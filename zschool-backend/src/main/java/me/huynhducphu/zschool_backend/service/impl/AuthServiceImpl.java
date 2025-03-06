package me.huynhducphu.zschool_backend.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.HttpServletResponse;
import me.huynhducphu.zschool_backend.model.User;
import me.huynhducphu.zschool_backend.repository.UserRepository;
import me.huynhducphu.zschool_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Admin 3/6/2025
 **/
@Service
@Transactional
public class AuthServiceImpl  implements AuthService {
    private final UserRepository userRepository;
    private final Algorithm algorithm;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, Algorithm algorithm) {
        this.userRepository = userRepository;
        this.algorithm = algorithm;
    }

    @Override
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie accessCookie = ResponseCookie.from("access_token", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .path("/")
                .maxAge(Duration.ofMinutes(0))
                .build();

        ResponseCookie refreshCookie  = ResponseCookie.from("refresh_token", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .path("/")
                .maxAge(Duration.ofSeconds(0))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Map<String, String>> refreshAccessToken(String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty())
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Refresh token không hợp lệ")
            );

        try {
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refreshToken);
            String username = decodedJWT.getSubject();

            User user = userRepository.findByUsername(username);
            if (user == null)
                return ResponseEntity.badRequest().body(
                        Map.of("message", "Người dùng không tồn tại")
                );

            String accessToken = JWT.create()
                    .withSubject(user.getUsername())
                    .withExpiresAt(new java.util.Date(System.currentTimeMillis() + 10 * 60 * 1000))
                    .withClaim("roles", user.getRoles().stream().map(role -> role.getName()).toList())
                    .sign(algorithm);

            String newRefreshToken = JWT.create()
                    .withSubject(user.getUsername())
                    .withExpiresAt(new java.util.Date(System.currentTimeMillis() + 30 * 60 * 1000))
                    .sign(algorithm);

            ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("Strict")
                    .path("/")
                    .maxAge(Duration.ofMinutes(10))
                    .build();

            ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", newRefreshToken)
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("Strict")
                    .path("/")
                    .maxAge(Duration.ofMinutes(30))
                    .build();

            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "Access token được làm mới thành công");

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, accessCookie.toString())
                    .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                    .body(responseBody);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Refresh token không hợp lệ hoặc đã hết hạn"));
        }
    }
}
