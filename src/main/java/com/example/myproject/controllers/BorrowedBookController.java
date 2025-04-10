package com.example.myproject.controllers;

import com.example.myproject.models.BorrowRequest;
import com.example.myproject.models.BorrowedBook;
import com.example.myproject.services.BorrowedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

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
        LocalDate borrowDate = borrowRequest.getBorrowDate();
        LocalDate returnDate = borrowRequest.getReturnDate();

        // Call the service to handle the business logic
        boolean success = Boolean.parseBoolean(String.valueOf(borrowService.borrowBook(userId, bookId, borrowDate, returnDate)));

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

    // View all borrowed books
    @GetMapping("/all")
    public ResponseEntity<List<BorrowedBook>> getAllBorrowedBooks() {
        return ResponseEntity.ok(borrowService.getAllBorrowedBooks());
    }

    // View borrowed books by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BorrowedBook>> getBorrowedBooksByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(borrowService.getBorrowedBooksByUserId(userId));
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<List<BorrowedBook>> getBorrowedBooksByUsername(@PathVariable String username) {
        return ResponseEntity.ok(borrowService.getBorrowedBooksByUsername(username));
    }


}
