package com.example.demo.controller;

import com.example.demo.dto.FavoritePetDTO;

import com.example.demo.entity.Favorite;
import com.example.demo.entity.Pet;

import com.example.demo.repository.FavoriteRepository;
import com.example.demo.repository.PetRepository;

import com.example.demo.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "http://localhost:3000")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private NotificationService notificationService;

    // =====================================================
    // ADD FAVORITE
    // =====================================================

    @PostMapping
    public Favorite addFavorite(
            @RequestBody Favorite favorite) {

        boolean exists = favoriteRepository
                .existsByUserIdAndPetId(
                        favorite.getUserId(),
                        favorite.getPetId());

        if (exists) {

            throw new RuntimeException(
                    "Pet already added to favorites");
        }

        Pet pet = petRepository
                .findById(
                        favorite.getPetId())
                .orElseThrow(
                        () -> new RuntimeException(
                                "Pet not found"));

        Favorite saved = favoriteRepository.save(
                favorite);

        notificationService.favoriteAdded(
                favorite.getUserId(),
                pet.getName());

        return saved;
    }

    // =====================================================
    // GET FAVORITES
    // =====================================================

    @GetMapping("/{userId}")
    public List<Favorite> getFavorites(
            @PathVariable Long userId) {

        return favoriteRepository
                .findByUserId(userId);
    }

    // =====================================================
    // GET FAVORITE PET DETAILS
    // =====================================================

    @GetMapping("/pets/{userId}")
    public List<FavoritePetDTO> getFavoritePets(
            @PathVariable Long userId) {

        List<Favorite> favorites = favoriteRepository
                .findByUserId(userId);

        List<FavoritePetDTO> result = new ArrayList<>();

        for (Favorite fav : favorites) {

            petRepository
                    .findById(
                            fav.getPetId())
                    .ifPresent(
                            pet -> result.add(
                                    new FavoritePetDTO(
                                            fav.getId(),
                                            pet)));
        }

        return result;
    }

    // =====================================================
    // GET FAVORITE ID
    // =====================================================

    @GetMapping("/pets/{userId}/{petId}")
    public Long getFavoriteId(
            @PathVariable Long userId,
            @PathVariable Long petId) {

        List<Favorite> favorites = favoriteRepository
                .findByUserId(userId);

        for (Favorite fav : favorites) {

            if (fav.getPetId()
                    .equals(petId)) {

                return fav.getId();
            }
        }

        return null;
    }

    // =====================================================
    // REMOVE FAVORITE
    // =====================================================

    @DeleteMapping("/{id}")
    public void removeFavorite(
            @PathVariable Long id) {

        Favorite favorite = favoriteRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Favorite not found"));

        Pet pet = petRepository
                .findById(
                        favorite.getPetId())
                .orElseThrow(
                        () -> new RuntimeException(
                                "Pet not found"));

        notificationService.favoriteRemoved(
                favorite.getUserId(),
                pet.getName());

        favoriteRepository.deleteById(id);
    }
}