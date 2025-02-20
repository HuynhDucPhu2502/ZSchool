package me.huynhducphu.zschool_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 2/20/2025
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegistrationRequest {
    @NotBlank(message = "Tài khoản không được để trống")
    @Size(min = 4, max = 20, message = "Tài khoản phải có từ 4 đến 20 ký tự")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Tài khoản chỉ được chứa chữ và số")
    private String username;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 6, max = 100, message = "Mật khẩu phải có ít nhất 6 ký tự")
    private String password;

    @NotBlank(message = "Tên người dùng không được để trống")
    @Size(max = 30, message = "Tên người dùng không được vượt quá 50 ký tự")
    private String name;
}
