package com.example.myproject.controllers;

import com.example.myproject.models.User;
import com.example.myproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.example.myproject.payload.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

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

    // 3. Create New User
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // 4. Update User
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userService.updateUser(id, userDetails);
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
                    "first_name", user.getFirstName() // ✅ Ensure first_name is returned
            ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }
    }


    // 6. ✅ **Login API**
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> foundUser = userService.findByEmailAndPassword(email, password);

        if (foundUser.isPresent()) {
            User user = foundUser.get();
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful!",
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "role", user.getRole(),
                    "first_name", user.getFirstName(),
                    "last_name", user.getLastName()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }

    // 8. Sign-up User (New Endpoint)
    @PostMapping("/signup")
    public ResponseEntity<?> signUpUser(@RequestBody User user) {
        // Validate if user already exists
        if (userService.findUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email is already registered!"));
        }

        // Save new user with the selected role
        User createdUser = userService.createUser(user);

        return ResponseEntity.ok(new MessageResponse("Sign-up successful!"));
    }
}
