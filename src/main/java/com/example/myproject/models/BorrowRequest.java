package com.example.myproject.models;

public class BorrowRequest {
    private Long userId;
    private Long bookId;

    // Default constructor
    public BorrowRequest() {}

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }
}
