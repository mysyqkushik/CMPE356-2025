package com.example.myproject.controllers;

import com.example.myproject.models.Messages;
import com.example.myproject.payload.MessagesRequest;
import com.example.myproject.repository.MessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody MessagesRequest request) {
        Messages message = new Messages(request.getFromUserId(), request.getToUserId(), request.getMessage());
        messageRepository.save(message);
        return ResponseEntity.ok("Message sent!");
    }

    @GetMapping("/received/{userId}")
    public List<Messages> getReceivedMessages(@PathVariable Long userId) {
        return messageRepository.findByToUserIdOrderByTimestampDesc(userId);
    }
}