package com.example.myproject.controllers;

import com.example.myproject.models.User;
import com.example.myproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend (React) to access backend
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Login API
    @PostMapping("/login")
    public String login(@RequestBody User loginRequest) {
        // Check if user exists in the database
        Optional<User> userOpt = userRepository.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Check password (⚠️ Passwords should be encrypted in production! eventually i guess lol)
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return "Login successful, Role: " + user.getRole();  // Return role to React
            } else {
                return "Incorrect password!";
            }
        }
        return "Account does not exist!";
    }
}
