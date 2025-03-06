package me.huynhducphu.zschool_backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import me.huynhducphu.zschool_backend.dto.request.UserRegistrationRequest;
import me.huynhducphu.zschool_backend.dto.response.UserProfileResponse;
import me.huynhducphu.zschool_backend.model.User;
import me.huynhducphu.zschool_backend.service.AuthService;
import me.huynhducphu.zschool_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 *  Admin 3/6/2025
 *  
**/
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final UserService userService;
    private final AuthService authService;

    @Autowired
    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMyProfile(@AuthenticationPrincipal User user) {

        UserProfileResponse userProfileResponse = new UserProfileResponse(
                user.getId(),
                user.getUsername(),
                user.getName()
        );

        return ResponseEntity.ok().body(userProfileResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> createUser(
            @Valid @RequestBody UserRegistrationRequest userRegistrationRequest
    ) {

        userService.saveUser(userRegistrationRequest);
        return ResponseEntity.ok().build();
    }



    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshAccessToken(
            @CookieValue(name = "refresh_token", required = false) String refreshToken
    ) {
        return authService.refreshAccessToken(refreshToken);
    }


    @GetMapping("/helloworld")
    public ResponseEntity<String> getHelloWorld() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello World!");
        return ResponseEntity.ok().body("Hello World!");
    }

}
