package com.example.myproject.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateRequest {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String currentPassword;    // Required for security
    private String newPassword;        // Optional, only if user wants to change password
} 