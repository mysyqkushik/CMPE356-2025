package com.example.myproject.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "messages")
public class Messages {

    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private boolean isRead = false;


    @Setter
    private Long fromUserId;
    @Setter
    private Long toUserId;

    @Setter
    @Column(columnDefinition = "TEXT")
    private String message;

    @Setter
    private LocalDateTime timestamp = LocalDateTime.now();

    public boolean isRead() { return isRead; }

    public void setIsRead(boolean isRead) { this.isRead = isRead; }

    // Constructors
    public Messages() {}

    public Messages(Long fromUserId, Long toUserId, String message) {
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

}
