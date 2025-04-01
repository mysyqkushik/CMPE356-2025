package com.example.myproject.com.example;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api") // Base URL for API endpoints
public class myproject{

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from Spring Boot API!";
    }
}
