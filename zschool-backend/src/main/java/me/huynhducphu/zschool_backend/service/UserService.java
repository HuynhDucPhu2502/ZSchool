package me.huynhducphu.zschool_backend.service;

import me.huynhducphu.zschool_backend.dto.request.UserRegistrationRequest;
import me.huynhducphu.zschool_backend.model.Role;
import me.huynhducphu.zschool_backend.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin 2/20/2025
 **/
@Service
public interface UserService {
    User saveUser(UserRegistrationRequest userRegistrationRequest);
    Role saveRole(Role role);
    void addRoleToUser(String userName, String roleName);
    User getUser(String userName);
    List<User> getUsers();
}
