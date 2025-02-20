package me.huynhducphu.zschool_backend.controller;

import me.huynhducphu.zschool_backend.dto.request.UserRegistrationRequest;
import me.huynhducphu.zschool_backend.model.User;
import me.huynhducphu.zschool_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Admin 2/20/2025
 **/
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/users")
    public ResponseEntity<Void> createUser(
            @RequestBody UserRegistrationRequest userRegistrationRequest) {
        User user = new User();
        user.setName(userRegistrationRequest.getName());
        user.setUsername(userRegistrationRequest.getUsername());
        user.setPassword(userRegistrationRequest.getPassword());

        userService.saveUser(user);
        return ResponseEntity.ok().build();
    }


}
