package me.huynhducphu.zschool_backend.controller;

import jakarta.validation.Valid;
import me.huynhducphu.zschool_backend.dto.request.ContactRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 2/18/2025
 **/
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {
    @PostMapping("/contacts")
    public ResponseEntity<Void> getContact(@Valid @RequestBody ContactRequest contact) {
        System.out.println(contact);
        return ResponseEntity.ok().build();
    }
}
