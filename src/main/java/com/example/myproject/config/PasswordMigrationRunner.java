package com.example.myproject.config;

import com.example.myproject.services.PasswordMigrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("password-migration") // Only run when the "password-migration" profile is active
public class PasswordMigrationRunner implements CommandLineRunner {

    @Autowired
    private PasswordMigrationService passwordMigrationService;


    @Override
    public void run(String... args) {
        System.out.println("Starting password migration...");
        passwordMigrationService.migrateExistingPasswords();
        System.out.println("Password migration completed.");
    }
} 