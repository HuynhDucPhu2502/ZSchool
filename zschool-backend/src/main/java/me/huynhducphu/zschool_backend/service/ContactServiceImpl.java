package me.huynhducphu.zschool_backend.service;

import me.huynhducphu.zschool_backend.dto.request.ContactRequest;
import me.huynhducphu.zschool_backend.model.Contact;
import me.huynhducphu.zschool_backend.model.enums.ContactStatus;
import me.huynhducphu.zschool_backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Admin 2/27/2025
 **/
@Service
@Transactional
public class ContactServiceImpl implements ContactService {
    private final ContactRepository contactRepository;

    @Autowired
    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Contact saveContact(ContactRequest contactRequest) {
        Contact contact = Contact
                .builder()
                .name(contactRequest.getName())
                .mobileNumber(contactRequest.getMobileNumber())
                .email(contactRequest.getEmail())
                .subject(contactRequest.getSubject())
                .message(contactRequest.getMessage())
                .status(ContactStatus.PENDING)
                .build();
        return contactRepository.save(contact);
    }
}
