package com.example.demo.service;

import com.example.demo.entity.Notification;
import com.example.demo.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

        @Autowired
        private NotificationRepository notificationRepository;

        // =====================================================
        // CREATE NOTIFICATION
        // =====================================================

        public void createNotification(
                        Long userId,
                        String message,
                        String type) {

                Notification notification = new Notification();

                notification.setUserId(userId);

                notification.setMessage(message);

                notification.setType(type);

                notification.setRead(false);

                notificationRepository.save(notification);
        }

        // =====================================================
        // ADOPTION REQUEST
        // =====================================================

        public void adoptionRequested(
                        Long userId,
                        String petName) {

                createNotification(
                                userId,
                                "Your adoption request for "
                                                + petName
                                                + " has been submitted.",
                                "ADOPTION_REQUEST");
        }

        // =====================================================
        // ADOPTION APPROVED
        // =====================================================

        public void adoptionApproved(
                        Long userId,
                        String petName) {

                createNotification(
                                userId,
                                "Your adoption request for "
                                                + petName
                                                + " has been approved! 🎉",
                                "ADOPTION_APPROVED");
        }

        // =====================================================
        // ADOPTION REJECTED
        // =====================================================

        public void adoptionRejected(
                        Long userId,
                        String petName) {

                createNotification(
                                userId,
                                "Your adoption request for "
                                                + petName
                                                + " has been rejected.",
                                "ADOPTION_REJECTED");
        }

        // =====================================================
        // NEW PET
        // =====================================================

        public void newPet(
                        Long userId,
                        String petName) {

                createNotification(
                                userId,
                                "New pet available: "
                                                + petName
                                                + " 🐾",
                                "NEW_PET");
        }

        // =====================================================
        // FAVORITE ADDED
        // =====================================================

        public void favoriteAdded(
                        Long userId,
                        String petName) {

                createNotification(
                                userId,
                                petName
                                                + " added to your favorites ❤️",
                                "FAVORITE_ADDED");
        }

        // =====================================================
        // FAVORITE REMOVED
        // =====================================================

        public void favoriteRemoved(
                        Long userId,
                        String petName) {

                createNotification(
                                userId,
                                petName
                                                + " removed from your favorites 💔",
                                "FAVORITE_REMOVED");
        }

        // =====================================================
        // NEW VET
        // =====================================================

        public void vetAdded(
                        Long userId,
                        String vetName) {

                createNotification(
                                userId,
                                "New veterinarian "
                                                + vetName
                                                + " is now available. 🩺",
                                "NEW_VET");
        }

        // =====================================================
        // VET DELETED
        // =====================================================

        public void vetDeleted(
                        Long userId,
                        String vetName) {

                createNotification(
                                userId,
                                "Veterinarian "
                                                + vetName
                                                + " is no longer available.",
                                "VET_DELETED");
        }

        // =====================================================
        // VET APPOINTMENT BOOKED
        // =====================================================

        public void appointmentBooked(
                        Long userId,
                        String vetName) {

                createNotification(
                                userId,
                                "Your appointment request with "
                                                + vetName
                                                + " has been submitted. 📅",
                                "APPOINTMENT_BOOKED");
        }

        // =====================================================
        // VET APPOINTMENT APPROVED
        // =====================================================

        public void appointmentApproved(
                        Long userId,
                        String vetName,
                        String date,
                        String time) {

                createNotification(
                                userId,
                                "Your appointment with "
                                                + vetName
                                                + " has been scheduled for "
                                                + date
                                                + " at "
                                                + time
                                                + ". ✅",
                                "APPOINTMENT_APPROVED");
        }

        // =====================================================
        // VET APPOINTMENT REJECTED
        // =====================================================

        public void appointmentRejected(
                        Long userId,
                        String vetName) {

                createNotification(
                                userId,
                                "Your appointment with "
                                                + vetName
                                                + " has been rejected. ❌",
                                "APPOINTMENT_REJECTED");
        }

        // =====================================================
        // PROFILE UPDATED
        // =====================================================

        public void profileUpdated(
                        Long userId) {

                createNotification(
                                userId,
                                "Your profile has been updated successfully. 👤",
                                "PROFILE_UPDATED");
        }

        // =====================================================
        // WELCOME
        // =====================================================

        public void welcome(
                        Long userId) {

                createNotification(
                                userId,
                                "Welcome to Pet Adoption Portal ❤️",
                                "WELCOME");
        }

        // =====================================================
        // CONTACT MESSAGE
        // =====================================================

        public void contactMessage(
                        Long userId) {

                createNotification(
                                userId,
                                "A new contact message has been received. 📩",
                                "CONTACT_MESSAGE");
        }

        // =====================================================
        // PET CARE REQUEST
        // =====================================================

        public void petCareRequest(
                        Long userId,
                        String service) {

                createNotification(
                                userId,
                                "Your pet-care request for "
                                                + service
                                                + " has been submitted. 🐾",
                                "PET_CARE_REQUEST");
        }

        // =====================================================
        // PET CARE APPROVED
        // =====================================================

        public void petCareApproved(
                        Long userId,
                        String service) {

                createNotification(
                                userId,
                                "Your pet-care request for "
                                                + service
                                                + " has been approved. ✅",
                                "PET_CARE_APPROVED");
        }

        // =====================================================
        // PET CARE REJECTED
        // =====================================================

        public void petCareRejected(
                        Long userId,
                        String service) {

                createNotification(
                                userId,
                                "Your pet-care request for "
                                                + service
                                                + " has been rejected. ❌",
                                "PET_CARE_REJECTED");
        }
}