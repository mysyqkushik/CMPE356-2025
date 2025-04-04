package com.example.myproject.services;

import com.example.myproject.models.Role;
import com.example.myproject.models.User;
import com.example.myproject.repository.RoleRepository;
import com.example.myproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            return userRepository.save(user);
        }
        return null;
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
}
