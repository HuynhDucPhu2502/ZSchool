package me.huynhducphu.zschool_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Admin 2/16/2025
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Contact {
    private String name;
    private String mobileNumber;
    private String email;
    private String subject;
    private String message;
}
