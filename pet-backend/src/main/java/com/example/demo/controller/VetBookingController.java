package com.example.demo.controller;

import com.example.demo.entity.VetBooking;

import com.example.demo.repository.VetBookingRepository;
import com.example.demo.service.NotificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vet-bookings")
@CrossOrigin(origins = {"http://localhost:3000", "https://pet-adoption-portal-at-ecru.vercel.app"})
public class VetBookingController {

        private final VetBookingRepository repository;

        private final NotificationService notificationService;

        public VetBookingController(
                        VetBookingRepository repository,
                        NotificationService notificationService) {

                this.repository = repository;

                this.notificationService = notificationService;
        }

        // =====================================================
        // USER - BOOK APPOINTMENT
        // =====================================================

        @PostMapping
        public ResponseEntity<?> createBooking(
                        @RequestBody VetBooking booking) {

                if (booking.getUserId() == null) {

                        return ResponseEntity.badRequest()
                                        .body("User ID is required");
                }

                if (booking.getVetId() == null) {

                        return ResponseEntity.badRequest()
                                        .body("Veterinarian ID is required");
                }

                if (booking.getPetName() == null ||
                                booking.getPetName().trim().isEmpty()) {

                        return ResponseEntity.badRequest()
                                        .body("Pet name is required");
                }

                if (booking.getReason() == null ||
                                booking.getReason().trim().isEmpty()) {

                        return ResponseEntity.badRequest()
                                        .body("Reason is required");
                }

                // New appointment starts as PENDING

                booking.setStatus("PENDING");

                booking.setAppointmentDate(null);

                booking.setAppointmentTime(null);

                VetBooking saved = repository.save(booking);

                // Notification

                notificationService.createNotification(
                                booking.getUserId(),

                                "Your vet appointment request for "
                                                + booking.getPetName()
                                                + " has been submitted and is waiting for admin approval.",

                                "VET_APPOINTMENT_BOOKED");

                return ResponseEntity.ok(saved);
        }

        // =====================================================
        // ADMIN - GET ALL APPOINTMENTS
        // =====================================================

        @GetMapping
        public ResponseEntity<List<VetBooking>> getAllBookings() {

                return ResponseEntity.ok(
                                repository.findAll());
        }

        // =====================================================
        // USER - GET MY APPOINTMENTS
        // =====================================================

        @GetMapping("/user/{userId}")
        public ResponseEntity<List<VetBooking>> getUserBookings(
                        @PathVariable Long userId) {

                List<VetBooking> bookings = repository.findByUserId(userId);

                return ResponseEntity.ok(bookings);
        }

        // =====================================================
        // ADMIN - GET APPOINTMENTS FOR SPECIFIC VET
        // =====================================================

        @GetMapping("/vet/{vetId}")
        public ResponseEntity<List<VetBooking>> getVetBookings(
                        @PathVariable Long vetId) {

                return ResponseEntity.ok(
                                repository.findByVetId(vetId));
        }

        // =====================================================
        // ADMIN - APPROVE APPOINTMENT
        // =====================================================

        @PutMapping("/{id}/approve")
        public ResponseEntity<?> approveBooking(
                        @PathVariable Long id,
                        @RequestBody Map<String, String> data) {

                VetBooking booking = repository.findById(id)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "Booking not found"));

                String date = data.get("appointmentDate");

                String time = data.get("appointmentTime");

                if (date == null ||
                                date.trim().isEmpty()) {

                        return ResponseEntity.badRequest()
                                        .body("Appointment date is required");
                }

                if (time == null ||
                                time.trim().isEmpty()) {

                        return ResponseEntity.badRequest()
                                        .body("Appointment time is required");
                }

                LocalDate appointmentDate;

                LocalTime appointmentTime;

                try {

                        appointmentDate = LocalDate.parse(date);

                        appointmentTime = LocalTime.parse(time);

                } catch (Exception e) {

                        return ResponseEntity.badRequest()
                                        .body("Invalid date or time format");
                }

                // Save appointment details

                booking.setAppointmentDate(
                                appointmentDate);

                booking.setAppointmentTime(
                                appointmentTime);

                booking.setStatus("APPROVED");

                VetBooking saved = repository.save(booking);

                // =================================================
                // NOTIFICATION TO USER
                // =================================================

                notificationService.createNotification(

                                booking.getUserId(),

                                "Your vet appointment for "
                                                + booking.getPetName()
                                                + " has been APPROVED. "
                                                + "Date: "
                                                + appointmentDate
                                                + ", Time: "
                                                + appointmentTime,

                                "VET_APPOINTMENT_APPROVED");

                return ResponseEntity.ok(saved);
        }

        // =====================================================
        // ADMIN - REJECT APPOINTMENT
        // =====================================================

        @PutMapping("/{id}/reject")
        public ResponseEntity<?> rejectBooking(
                        @PathVariable Long id) {

                VetBooking booking = repository.findById(id)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "Booking not found"));

                booking.setStatus("REJECTED");

                booking.setAppointmentDate(null);

                booking.setAppointmentTime(null);

                VetBooking saved = repository.save(booking);

                // =================================================
                // NOTIFICATION TO USER
                // =================================================

                notificationService.createNotification(

                                booking.getUserId(),

                                "Your vet appointment request for "
                                                + booking.getPetName()
                                                + " has been REJECTED.",

                                "VET_APPOINTMENT_REJECTED");

                return ResponseEntity.ok(saved);
        }

        // =====================================================
        // DELETE APPOINTMENT
        // =====================================================

        @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteBooking(
                        @PathVariable Long id) {

                VetBooking booking = repository.findById(id)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "Booking not found"));

                Long userId = booking.getUserId();

                String petName = booking.getPetName();

                repository.deleteById(id);

                notificationService.createNotification(

                                userId,

                                "Your vet appointment for "
                                                + petName
                                                + " has been deleted.",

                                "VET_APPOINTMENT_DELETED");

                return ResponseEntity.ok(
                                "Appointment deleted successfully");
        }
}