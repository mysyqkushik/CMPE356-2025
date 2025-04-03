package com.example.myproject.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User {

    // 🛠 Getters & Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String role;  // ✅ Added Role Field


    @Column(name = "first_name", nullable = false) // this column exists in your DB
    private String firstName;

    @Column(name = "last_name", nullable = false) // this column exists in your DB
    private String lastName;

}
