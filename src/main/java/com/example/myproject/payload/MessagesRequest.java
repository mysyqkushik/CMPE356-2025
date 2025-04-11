package com.example.myproject.payload;

public class MessagesRequest {
    private Long fromUserId;
    private Long toUserId;
    private String message;

    // Getters and Setters
    public Long getFromUserId() { return fromUserId; }
    public void setFromUserId(Long fromUserId) { this.fromUserId = fromUserId; }

    public Long getToUserId() { return toUserId; }
    public void setToUserId(Long toUserId) { this.toUserId = toUserId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
