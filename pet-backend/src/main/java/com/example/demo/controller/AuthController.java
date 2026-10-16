package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.NotificationService;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private NotificationService notificationService;

    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public User register(
            @RequestBody User user) {

        if (user.getRole() == null ||
                user.getRole().trim().isEmpty()) {

            user.setRole("USER");

        } else {

            user.setRole(
                    user.getRole()
                            .toUpperCase()
                            .trim());
        }

        User savedUser = userService.registerUser(user);

        notificationService.createNotification(
                savedUser.getId(),
                "Welcome to Pet Adoption Portal ❤️",
                "WELCOME");

        return savedUser;
    }

    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        User user = userRepository
                .findByEmail(
                        request.getEmail())
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid password");
        }

        // Make sure role is always available
        String role = user.getRole() == null
                ? "USER"
                : user.getRole()
                        .toUpperCase()
                        .trim();

        String token = JwtUtil.generateToken(
                user.getEmail(),
                role);

        System.out.println(
                "LOGIN USER ID = " +
                        user.getId());

        System.out.println(
                "LOGIN USER EMAIL = " +
                        user.getEmail());

        System.out.println(
                "LOGIN USER ROLE = " +
                        role);

        return new LoginResponse(
                token,
                user.getId(),
                role);
    }
}