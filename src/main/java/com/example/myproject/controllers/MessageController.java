package com.example.myproject.controllers;

import com.example.myproject.models.Messages;
import com.example.myproject.payload.MessagesRequest;
import com.example.myproject.repository.MessageRepository;
import com.example.myproject.services.MessageService;
import com.example.myproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody MessagesRequest request) {
        try {
            // Validate fromUserId exists
            if (userService.getUserById(request.getFromUserId()) == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Invalid sender ID"));
            }

            // Validate toUserId exists
            if (userService.getUserById(request.getToUserId()) == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Invalid recipient ID"));
            }

            // Validate message is not empty
            if (request.getMessage() == null || request.getMessage().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Message cannot be empty"));
            }

            Messages message = new Messages(
                    request.getFromUserId(),
                    request.getToUserId(),
                    request.getMessage().trim()
            );

            messageRepository.save(message);

            return ResponseEntity.ok(Map.of(
                    "message", "Message sent successfully!",
                    "timestamp", message.getTimestamp()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Failed to send message: " + e.getMessage()));
        }
    }

    @GetMapping("/received/{userId}")
    public List<Messages> getReceivedMessages(@PathVariable Long userId) {
        return messageRepository.findByToUserIdOrderByTimestampDesc(userId);
    }

    @GetMapping("/unread-count/{userId}")
    public int getUnreadMessages(@PathVariable int userId) {
        return messageService.getUnreadMessageCount(userId);
    }

    @PutMapping("/mark-read/{userId}")
    public ResponseEntity<?> markAllRead(@PathVariable int userId) {
        messageService.markMessagesAsRead(userId);
        return ResponseEntity.ok("Marked all messages as read.");
    }

}