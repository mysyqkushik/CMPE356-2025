package com.example.myproject.controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myproject.models.Role;
import com.example.myproject.models.SignUpRequest;
import com.example.myproject.models.User;
import com.example.myproject.models.UserUpdateRequest;
import com.example.myproject.models.ProfileUpdateRequest;
import com.example.myproject.repository.RoleRepository;
import com.example.myproject.repository.UserRepository;
import com.example.myproject.services.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 1. Get All Users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 2. Get User by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // 3. Create New User //actually signup is used
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }


    // 4. Update User
    @PutMapping("/{id}")
    public String updateUser(@PathVariable Long id, @RequestBody UserUpdateRequest userUpdateRequest) {
        return String.valueOf(userService.updateUser(id, userUpdateRequest));
    }




    // 5. Delete User
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        return deleted ? "User deleted successfully!" : "User not found!";
    }

    // 7. Get User by Username (for Dashboard)
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<User> userOptional = userService.getUserByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(Map.of(
                    "username", user.getUsername(),
                    "first_name", user.getFirstName(),
                    "id", user.getId()// ✅ Ensure first_name is returned
            ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }
    }


    // 6. ✅ **Login API**
    // Login API with Role Handling
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> foundUser = userService.findUserByEmail(email);

        if (foundUser.isPresent()) {
            User user = foundUser.get();

            // ✅ Extract role names correctly
            Set<String> roleNames = user.getRoles().stream()
                    .map(Role::getName)
                    .collect(Collectors.toSet());

            // ✅ Return user details
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful!",
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "roles", roleNames, // Now correctly fetching role names
                    "first_name", user.getFirstName(),
                    "last_name", user.getLastName()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }


    // 8. Sign-up User (New Endpoint)
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        try {
            User user = new User();
            user.setFirstName(signUpRequest.getFirstName());
            user.setLastName(signUpRequest.getLastName());
            user.setUsername(signUpRequest.getUsername());
            user.setEmail(signUpRequest.getEmail());
            user.setPassword(signUpRequest.getPassword());

            Set<Role> userRoles = new HashSet<>();
            for (String roleStr : signUpRequest.getRoles()) {
                Role role = roleRepository.findByName(roleStr)
                        .orElseThrow(() -> new RuntimeException("Role not found: " + roleStr));
                userRoles.add(role);
            }

            user.setRoles(userRoles);
            userRepository.save(user);

            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // 9. Forgot Password Request
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> emailRequest) {
        String email = emailRequest.get("email");

        // Check if the email exists using the service
        if (userService.checkEmailExists(email)) {
            // You can add logic here to send a password reset email (optional)
            return ResponseEntity.ok("Password reset request received. Please enter your new password.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found.");
        }
    }

    // 10. Reset Password
    @PutMapping("/reset-password/{email}")
    public ResponseEntity<String> resetPassword(@PathVariable String email, @RequestBody Map<String, String> passwordRequest)
    {
        String newPassword = passwordRequest.get("newPassword");

        // Update password in the database
        if (userService.resetPassword(email, newPassword)) {
            return ResponseEntity.ok("Password has been reset. Please log in again.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found.");
        }

    }

    //for admin dashboard to view all users
    @GetMapping("/no-password")
    public List<Map<String, Object>> getUsersWithoutPasswords() {
        return userService.getUsersWithoutPasswords();
    }

    // Added profile update endpoint
    @PutMapping("/profile/{email}")
    public ResponseEntity<?> updateProfile(
            @PathVariable String email,
            @RequestBody ProfileUpdateRequest updateRequest) {
        
        // Find the user
        Optional<User> userOpt = userService.findUserByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "User not found"));
        }

        User user = userOpt.get();

        // Verify current password
        if (!passwordEncoder.matches(updateRequest.getCurrentPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Current password is incorrect"));
        }

        // Update user details
        if (updateRequest.getUsername() != null && !updateRequest.getUsername().isEmpty()) {
            // Check if username is already taken by another user
            Optional<User> existingUser = userService.getUserByUsername(updateRequest.getUsername());
            if (existingUser.isPresent() && !existingUser.get().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Username is already taken"));
            }
            user.setUsername(updateRequest.getUsername());
        }

        if (updateRequest.getEmail() != null && !updateRequest.getEmail().isEmpty()) {
            // Check if email is already taken by another user
            Optional<User> existingUser = userService.findUserByEmail(updateRequest.getEmail());
            if (existingUser.isPresent() && !existingUser.get().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email is already taken"));
            }
            user.setEmail(updateRequest.getEmail());
        }

        if (updateRequest.getFirstName() != null) {
            user.setFirstName(updateRequest.getFirstName());
        }

        if (updateRequest.getLastName() != null) {
            user.setLastName(updateRequest.getLastName());
        }

        // Update password if new password is provided
        if (updateRequest.getNewPassword() != null && !updateRequest.getNewPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updateRequest.getNewPassword()));
        }

        // Save the updated user
        userRepository.save(user);

        // Return updated user details (excluding password)
        return ResponseEntity.ok(Map.of(
            "message", "Profile updated successfully",
            "user", Map.of(
                "username", user.getUsername(),
                "email", user.getEmail(),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName()
            )
        ));
    }

    @GetMapping("/all-except-admin")
    public ResponseEntity<List<Map<String, Object>>> getAllUsersExceptAdmin() {
        List<User> allUsers = userService.getAllUsers();

        List<Map<String, Object>> usersList = allUsers.stream()
                .filter(user -> !user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toSet())
                        .contains("admin")) // Filter out admin users
                .map(user -> {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", user.getId());
                    userMap.put("name", user.getFirstName() + " " + user.getLastName());
                    userMap.put("username", user.getUsername());
                    userMap.put("email", user.getEmail());
                    return userMap;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(usersList);
    }

}
