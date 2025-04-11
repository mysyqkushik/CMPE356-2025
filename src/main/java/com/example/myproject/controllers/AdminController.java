package com.example.myproject.controllers;

import com.example.myproject.models.User;
import com.example.myproject.services.PasswordMigrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.myproject.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordMigrationService passwordMigrationService;

    @PostMapping("/migrate-passwords")
    public ResponseEntity<String> migratePasswords() {
        try {
            passwordMigrationService.migrateExistingPasswords();
            return ResponseEntity.ok("Password migration completed successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body("Password migration failed: " + e.getMessage());
        }
    }

    @PostMapping("/hash-existing-passwords")
    public ResponseEntity<String> hashExistingPasswords() {
        try {
            List<User> users = userRepository.findAll();
            int count = 0;
            
            for (User user : users) {
                String currentPassword = user.getPassword();
                
                if (!currentPassword.startsWith("$2a$")) {
                    String hashedPassword = passwordEncoder.encode(currentPassword);
                    user.setPassword(hashedPassword);
                    userRepository.save(user);
                    count++;
                }
            }
            
            return ResponseEntity.ok("Successfully hashed passwords for " + count + " users");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body("Failed to hash passwords: " + e.getMessage());
        }
    }
} 