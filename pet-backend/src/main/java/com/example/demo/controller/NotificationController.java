package com.example.demo.controller;

import com.example.demo.entity.Notification;
import com.example.demo.repository.NotificationRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = {"http://localhost:3000", "https://pet-adoption-portal-at-ecru.vercel.app"})
public class NotificationController {

        private final NotificationRepository repository;

        public NotificationController(
                        NotificationRepository repository) {

                this.repository = repository;
        }

        // =========================================
        // GET USER NOTIFICATIONS
        // =========================================

        @GetMapping("/{userId}")
        public List<Notification> getNotifications(
                        @PathVariable Long userId) {

                return repository.findByUserIdOrderByCreatedAtDesc(
                                userId);
        }

        // =========================================
        // UNREAD COUNT
        // =========================================

        @GetMapping("/count/{userId}")
        public long getUnreadCount(
                        @PathVariable Long userId) {

                return repository.countByUserIdAndReadFalse(
                                userId);
        }

        // =========================================
        // MARK AS READ
        // =========================================

        @PutMapping("/read/{id}")
        public Notification markAsRead(
                        @PathVariable Long id) {

                Notification notification = repository.findById(id)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "Notification not found"));

                notification.setRead(true);

                return repository.save(notification);
        }

        // =========================================
        // DELETE
        // =========================================

        @DeleteMapping("/{id}")
        public void deleteNotification(
                        @PathVariable Long id) {

                repository.deleteById(id);
        }
}