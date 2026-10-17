package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.entity.Vet;

import com.example.demo.repository.UserRepository;
import com.example.demo.repository.VetRepository;

import com.example.demo.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vets")
@CrossOrigin(origins = {"http://localhost:3000", "https://pet-adoption-portal-at-ecru.vercel.app"})
public class VetController {

    @Autowired
    private VetRepository vetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    // =====================================================
    // GET ALL VETS
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Vet>> getAllVets() {

        return ResponseEntity.ok(
                vetRepository.findAll());
    }

    // =====================================================
    // GET VET BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<Vet> getVetById(
            @PathVariable Long id) {

        return vetRepository
                .findById(id)
                .map(
                        ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound()
                                .build());
    }

    // =====================================================
    // ADD VET
    // =====================================================

    @PostMapping
    public ResponseEntity<Vet> addVet(
            @RequestBody Vet vet) {

        Vet savedVet = vetRepository.save(
                vet);

        // Notify all normal users

        List<User> users = userRepository.findAll();

        for (User user : users) {

            if ("USER".equalsIgnoreCase(
                    user.getRole())) {

                notificationService.vetAdded(
                        user.getId(),
                        savedVet.getName());
            }
        }

        return ResponseEntity.ok(
                savedVet);
    }

    // =====================================================
    // UPDATE VET
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<Vet> updateVet(
            @PathVariable Long id,
            @RequestBody Vet vet) {

        return vetRepository
                .findById(id)
                .map(
                        existingVet -> {

                            existingVet.setName(
                                    vet.getName());

                            existingVet.setSpecialization(
                                    vet.getSpecialization());

                            existingVet.setExperience(
                                    vet.getExperience());

                            existingVet.setClinicName(
                                    vet.getClinicName());

                            existingVet.setLocation(
                                    vet.getLocation());

                            existingVet.setFee(
                                    vet.getFee());

                            existingVet.setPhone(
                                    vet.getPhone());

                            existingVet.setEmail(
                                    vet.getEmail());

                            existingVet.setAvailableDays(
                                    vet.getAvailableDays());

                            existingVet.setAvailableTime(
                                    vet.getAvailableTime());

                            Vet updatedVet = vetRepository.save(
                                    existingVet);

                            return ResponseEntity.ok(
                                    updatedVet);
                        })
                .orElse(
                        ResponseEntity.notFound()
                                .build());
    }

    // =====================================================
    // DELETE VET
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVet(
            @PathVariable Long id) {

        Vet vet = vetRepository
                .findById(id)
                .orElse(null);

        if (vet == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        String vetName = vet.getName();

        // Notify users BEFORE deleting

        List<User> users = userRepository.findAll();

        for (User user : users) {

            if ("USER".equalsIgnoreCase(
                    user.getRole())) {

                notificationService.vetDeleted(
                        user.getId(),
                        vetName);
            }
        }

        vetRepository.deleteById(
                id);

        return ResponseEntity.ok(
                "Veterinarian deleted successfully");
    }
}