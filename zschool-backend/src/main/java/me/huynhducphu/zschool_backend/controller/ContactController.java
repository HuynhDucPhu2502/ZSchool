package me.huynhducphu.zschool_backend.controller;

import me.huynhducphu.zschool_backend.dto.request.ContactDTO;
import me.huynhducphu.zschool_backend.model.Contact;
import org.springframework.web.bind.annotation.*;

/**
 * Admin 2/18/2025
 **/
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {
    @PostMapping("/contacts")
    public void getContact(@RequestBody ContactDTO contact) {
        System.out.println(contact);
    }
}
