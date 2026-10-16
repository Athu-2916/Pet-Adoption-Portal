package com.example.demo.controller;

import com.example.demo.dto.AdoptionRequestDTO;
import com.example.demo.entity.AdoptionRequest;
import com.example.demo.entity.Pet;
import com.example.demo.entity.User;

import com.example.demo.repository.AdoptionRepository;
import com.example.demo.repository.PetRepository;
import com.example.demo.repository.UserRepository;

import com.example.demo.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adoptions")
@CrossOrigin(origins = "http://localhost:3000")
public class AdoptionController {

    @Autowired
    private AdoptionRepository adoptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private NotificationService notificationService;

    // =====================================================
    // CREATE ADOPTION REQUEST
    // =====================================================

    @PostMapping
    public AdoptionRequest createRequest(
            @RequestBody AdoptionRequestDTO dto) {

        List<AdoptionRequest> existing = adoptionRepository
                .findByUser_IdAndPet_Id(
                        dto.getUserId(),
                        dto.getPetId());

        if (!existing.isEmpty()) {

            throw new RuntimeException(
                    "You have already requested this pet");
        }

        User user = userRepository
                .findById(dto.getUserId())
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"));

        Pet pet = petRepository
                .findById(dto.getPetId())
                .orElseThrow(
                        () -> new RuntimeException(
                                "Pet not found"));

        AdoptionRequest request = new AdoptionRequest();

        request.setUser(user);

        request.setPet(pet);

        request.setStatus("PENDING");

        AdoptionRequest saved = adoptionRepository.save(
                request);

        // USER NOTIFICATION

        notificationService.adoptionRequested(
                user.getId(),
                pet.getName());

        return saved;
    }

    // =====================================================
    // GET ALL ADOPTION REQUESTS
    // ADMIN
    // =====================================================

    @GetMapping
    public List<AdoptionRequest> getAllRequests() {

        return adoptionRepository.findAll();
    }

    // =====================================================
    // GET USER ADOPTION REQUESTS
    // =====================================================

    @GetMapping("/user/{userId}")
    public List<AdoptionRequest> getUserRequests(
            @PathVariable Long userId) {

        return adoptionRepository
                .findByUser_Id(userId);
    }

    // =====================================================
    // GET STATUS
    // =====================================================

    @GetMapping("/status/{userId}/{petId}")
    public String getStatus(
            @PathVariable Long userId,
            @PathVariable Long petId) {

        List<AdoptionRequest> requests = adoptionRepository
                .findByUser_IdAndPet_Id(
                        userId,
                        petId);

        if (requests.isEmpty()) {

            return "NONE";
        }

        return requests
                .get(0)
                .getStatus();
    }

    // =====================================================
    // ADMIN UPDATE REQUEST
    // APPROVE / REJECT
    // =====================================================

    @PutMapping("/{id}")
    public AdoptionRequest updateRequest(
            @PathVariable Long id,
            @RequestBody AdoptionRequest updatedRequest) {

        AdoptionRequest request = adoptionRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Adoption request not found"));

        String newStatus = updatedRequest.getStatus();

        request.setStatus(
                newStatus);

        // =================================================
        // APPROVED
        // =================================================

        if ("APPROVED".equalsIgnoreCase(
                newStatus)) {

            notificationService.adoptionApproved(
                    request.getUser().getId(),
                    request.getPet().getName());
        }

        // =================================================
        // REJECTED
        // =================================================

        if ("REJECTED".equalsIgnoreCase(
                newStatus)) {

            notificationService.adoptionRejected(
                    request.getUser().getId(),
                    request.getPet().getName());
        }

        return adoptionRepository.save(
                request);
    }
}