package me.huynhducphu.zschool_backend.service;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.Map;

/**
 * Admin 3/6/2025
 **/
public interface AuthService {
    ResponseEntity<Void> logout(HttpServletResponse response);
    ResponseEntity<Map<String, String>> refreshAccessToken(String refreshToken);
}
