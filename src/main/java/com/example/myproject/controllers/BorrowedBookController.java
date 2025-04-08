package com.example.myproject.controllers;

import com.example.myproject.models.BorrowRequest;
import com.example.myproject.services.BorrowedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/borrow")
@CrossOrigin(origins = "http://localhost:3000")
public class BorrowedBookController {

    @Autowired
    private BorrowedBookService borrowService;

    @PostMapping("/borrow")
    public ResponseEntity<String> borrowBook(@RequestBody BorrowRequest borrowRequest) {
        // Extract userId and bookId from the BorrowRequest object
        Long userId = borrowRequest.getUserId();
        Long bookId = borrowRequest.getBookId();

        // Call the service to handle the business logic
        boolean success = borrowService.borrowBook(userId, bookId);

        if (success) {
            return ResponseEntity.ok("Book borrowed successfully!");
        } else {
            return ResponseEntity.status(400).body("Error while borrowing the book");
        }
    }

    @PostMapping("/return")
    public ResponseEntity<String> returnBook(@RequestBody BorrowRequest borrowRequest) {
        Long userId = borrowRequest.getUserId();
        Long bookId = borrowRequest.getBookId();

        // Call the service to handle the return logic
        boolean success = borrowService.returnBook(userId, bookId);

        if (success) {
            return ResponseEntity.ok("Book returned successfully!");
        } else {
            return ResponseEntity.status(400).body("Error while returning the book");
        }
    }
}
