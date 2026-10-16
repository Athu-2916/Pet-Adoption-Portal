package com.example.demo.controller;

import com.example.demo.entity.Contact;
import com.example.demo.entity.User;

import com.example.demo.repository.UserRepository;

import com.example.demo.service.ContactService;
import com.example.demo.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    // =====================================================
    // SAVE CONTACT MESSAGE
    // =====================================================

    @PostMapping
    public Contact saveMessage(
            @RequestBody Contact contact) {

        Contact saved = contactService.saveMessage(
                contact);

        // Notify all administrators

        List<User> users = userRepository.findAll();

        for (User user : users) {

            if ("ADMIN".equalsIgnoreCase(
                    user.getRole())) {

                notificationService.contactMessage(
                        user.getId());
            }
        }

        return saved;
    }

    // =====================================================
    // GET ALL MESSAGES
    // =====================================================

    @GetMapping
    public List<Contact> getAllMessages() {

        return contactService.getAllMessages();
    }

    // =====================================================
    // DELETE MESSAGE
    // =====================================================

    @DeleteMapping("/{id}")
    public void deleteMessage(
            @PathVariable Long id) {

        contactService.deleteMessage(
                id);
    }
}