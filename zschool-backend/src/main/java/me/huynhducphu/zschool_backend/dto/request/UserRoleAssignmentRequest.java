package me.huynhducphu.zschool_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 2/20/2025
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleAssignmentRequest {
    @NotBlank(message = "Tên người dùng không được để trống")
    private String username;

    @NotBlank(message = "Chức vụ không được để trống")
    private String roleName;
}
