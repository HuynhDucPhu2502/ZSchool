package me.huynhducphu.zschool_backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 2/18/2025
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactDTO {
    @NotBlank(message = "Họ tên không được để trống")
    private String name;

    @NotBlank(message = "Số điện không được để trống")
    @Pattern(regexp = "^[0-9]{10,11}$", message = "Số điện thoại không hợp lệ")
    private String mobileNumber;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    private String subject;

    @NotBlank(message = "Tin nhắn không được để trống")
    @Size(max = 500, message = "Tin nhắn không quá 500 ký tự")
    private String message;
}
