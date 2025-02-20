package me.huynhducphu.zschool_backend.controller;

import jakarta.validation.Valid;
import me.huynhducphu.zschool_backend.dto.request.ContactDTO;
import me.huynhducphu.zschool_backend.model.Contact;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Admin 2/18/2025
 **/
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {
    @PostMapping("/contacts")
    public ResponseEntity<Void> getContact(@Valid @RequestBody ContactDTO contact) {
        System.out.println(contact);
        return ResponseEntity.ok().build();
    }
}
