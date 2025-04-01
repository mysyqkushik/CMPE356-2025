package com.example.myproject.repository;

import com.example.myproject.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // This will automatically create CRUD operations
}
