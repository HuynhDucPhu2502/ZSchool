package me.huynhducphu.zschool_backend.dto.request;

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
    private String name;
    private String mobileNumber;
    private String email;
    private String subject;
    private String message;
}
