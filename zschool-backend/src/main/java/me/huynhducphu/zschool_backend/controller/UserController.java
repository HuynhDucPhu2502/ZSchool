package me.huynhducphu.zschool_backend.controller;

import jakarta.validation.Valid;
import me.huynhducphu.zschool_backend.dto.request.UserRegistrationRequest;
import me.huynhducphu.zschool_backend.dto.request.UserRoleAssignmentRequest;
import me.huynhducphu.zschool_backend.model.Role;
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

    @PostMapping("/user/save")
    public ResponseEntity<Void> createUser(
            @Valid @RequestBody UserRegistrationRequest userRegistrationRequest) {

        userService.saveUser(userRegistrationRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/role/save")
    public ResponseEntity<Void> createRole(
            @Valid @RequestBody Role role) {
        userService.saveRole(role);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<Void> addRoleToUser(
            @Valid @RequestBody UserRoleAssignmentRequest userRoleAssignmentRequest) {
        userService.addRoleToUser(
                userRoleAssignmentRequest.getUsername(),
                userRoleAssignmentRequest.getRoleName()
        );
        return ResponseEntity.ok().build();
    }


}
