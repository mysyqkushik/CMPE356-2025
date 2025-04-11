package com.example.myproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.myproject.models.User;
import com.example.myproject.repository.UserRepository;

@Service
public class PasswordMigrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Transactional
    public void migrateExistingPasswords() {
        List<User> users = userRepository.findAll();
        int totalUsers = users.size();
        int migratedUsers = 0;

        for (User user : users) {
            String plainPassword = user.getPassword(); // Get the current non-hashed password
            String hashedPassword = passwordEncoder.encode(plainPassword);
            user.setPassword(hashedPassword);
            userRepository.save(user);
            migratedUsers++;
            
            // Log progress
            System.out.println("Migrated " + migratedUsers + " out of " + totalUsers + " users");
        }
        
        System.out.println("Password migration completed. Total users processed: " + migratedUsers);
    }
} 