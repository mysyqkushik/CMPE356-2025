package com.example.myproject.services;

import com.example.myproject.models.Role;
import com.example.myproject.models.User;
import com.example.myproject.models.UserUpdateRequest;
import com.example.myproject.repository.RoleRepository;
import com.example.myproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 1. Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2. Get User by ID
    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    // 3. Create New User
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // 4. Update User
    public String updateUser(Long id, UserUpdateRequest userUpdateRequest) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Update only the fields that are provided
            if (userUpdateRequest.getUsername() != null) {
                user.setUsername(userUpdateRequest.getUsername());
            }
            if (userUpdateRequest.getEmail() != null) {
                user.setEmail(userUpdateRequest.getEmail());
            }
            if (userUpdateRequest.getFirstName() != null) {
                user.setFirstName(userUpdateRequest.getFirstName());
            }
            if (userUpdateRequest.getLastName() != null) {
                user.setLastName(userUpdateRequest.getLastName());
            }
            if (userUpdateRequest.getPassword() != null) {
                user.setPassword(userUpdateRequest.getPassword());  // Consider hashing the password here
            }

            userRepository.save(user);
            return "User updated successfully.";
        }
        return "User not found.";
    }



    // 5. Delete User
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<User> findByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    // Method to check if user already exists
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }



    @Autowired
    private RoleRepository roleRepository;

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists with this email.";
        }


        Set<Role> roles = new HashSet<>();
        // Assign roles - this is where we assign default role(s), or you can add logic to allow multirole selection
        Optional<Role> role = roleRepository.findByName("customer");
        role.ifPresent(roles::add);

        user.setRoles(roles);
        userRepository.save(user);

        return "User registered successfully.";
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Method to check if email exists in the database
    public boolean checkEmailExists(String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{email}, Integer.class);
        return count != null && count > 0;
    }

    // Method to update the password
    public boolean resetPassword(String email, String newPassword) {
        String sql = "UPDATE users SET password = ? WHERE email = ?";
        int updated = jdbcTemplate.update(sql, newPassword, email);
        return updated > 0;
    }

    public List<Map<String, Object>> getUsersWithoutPasswords() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("username", user.getUsername());
            userMap.put("email", user.getEmail());
            userMap.put("role", user.getRoles()); // Adjust if roles is a Set
            return userMap;
        }).collect(Collectors.toList());
    }

}
