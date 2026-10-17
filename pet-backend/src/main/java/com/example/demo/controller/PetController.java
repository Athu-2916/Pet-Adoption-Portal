package com.example.demo.controller;

import com.example.demo.entity.Pet;
import com.example.demo.entity.User;

import com.example.demo.repository.PetRepository;
import com.example.demo.repository.UserRepository;

import com.example.demo.service.NotificationService;
import com.example.demo.service.PetService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://pet-adoption-portal-at-ecru.vercel.app"})
@RequestMapping("/pets")
public class PetController {

    @Autowired
    private PetService petService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PetRepository petRepository;

    // =====================================================
    // GET ALL PETS
    // =====================================================

    @GetMapping
    public List<Pet> getAllPets() {

        return petService.getAllPets();
    }

    // =====================================================
    // GET PET BY ID
    // =====================================================

    @GetMapping("/{id}")
    public Pet getPetById(
            @PathVariable Long id) {

        return petService.getPetById(id);
    }

    // =====================================================
    // SEARCH PETS
    // =====================================================

    @GetMapping("/search")
    public List<Pet> searchPets(
            @RequestParam String keyword) {

        return petService.searchPets(
                keyword);
    }

    // =====================================================
    // ADD PET
    // =====================================================

    @PostMapping
    public Pet addPet(
            @RequestBody Pet pet) {

        Pet savedPet = petService.addPet(pet);

        // Notify all normal users

        List<User> users = userRepository.findAll();

        for (User user : users) {

            if ("USER".equalsIgnoreCase(
                    user.getRole())) {

                notificationService.newPet(
                        user.getId(),
                        savedPet.getName());
            }
        }

        return savedPet;
    }

    // =====================================================
    // UPDATE PET
    // =====================================================

    @PutMapping("/{id}")
    public Pet updatePet(
            @PathVariable Long id,
            @RequestBody Pet pet) {

        return petService.updatePet(
                id,
                pet);
    }

    // =====================================================
    // DELETE PET
    // =====================================================

    @DeleteMapping("/{id}")
    public void deletePet(
            @PathVariable Long id) {

        petService.deletePet(id);
    }
}