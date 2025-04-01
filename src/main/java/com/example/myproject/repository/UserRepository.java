package com.example.myproject.repository;

import com.example.myproject.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndPassword(String email, String password);
    // This will automatically create CRUD operations
    Optional<User> findByUsername(String username);
}
