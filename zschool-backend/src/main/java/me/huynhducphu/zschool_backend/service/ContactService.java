package me.huynhducphu.zschool_backend.service;

import me.huynhducphu.zschool_backend.dto.request.ContactRequest;
import me.huynhducphu.zschool_backend.model.Contact;

/**
 * Admin 2/27/2025
 **/
public interface ContactService {
    Contact saveContact(ContactRequest contactRequest);
}
