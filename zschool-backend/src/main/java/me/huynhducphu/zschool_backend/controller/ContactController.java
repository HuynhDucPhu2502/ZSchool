package me.huynhducphu.zschool_backend.controller;

import jakarta.validation.Valid;
import me.huynhducphu.zschool_backend.dto.request.ContactRequest;
import me.huynhducphu.zschool_backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 2/18/2025
 **/
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {
    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/contact/saveWithoutLogin")
    public ResponseEntity<Void> saveContactWithoutLogin(@Valid @RequestBody ContactRequest contact) {
        contactService.saveContact(contact);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/contact/saveWithLogin")
    public ResponseEntity<Void> saveContactWithLoign(@Valid @RequestBody ContactRequest contact) {
        contactService.saveContact(contact);
        return ResponseEntity.ok().build();
    }


}
