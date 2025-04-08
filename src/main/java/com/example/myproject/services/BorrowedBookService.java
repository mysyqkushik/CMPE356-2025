package com.example.myproject.services;

import com.example.myproject.models.Book;
import com.example.myproject.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BorrowedBookService {

    @Autowired
    private BookRepository bookRepository;

    // Borrow Book
    public boolean borrowBook(Long userId, Long bookId) {
        // Find the book by its ID
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));

        // Check if the book has quantity available to be borrowed
        if (book.getQuantity() > 0) {
            // Decrease the quantity by 1 as the book is borrowed
            book.setQuantity(book.getQuantity() - 1);

            // Save the updated book information
            bookRepository.save(book);
            return true; // Borrow successful
        } else {
            return false; // No available copies of the book
        }
    }

    // Return Book
    public boolean returnBook(Long userId, Long bookId) {
        // Find the book by its ID
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));

        // Increase the quantity by 1 as the book is returned
        book.setQuantity(book.getQuantity() + 1);

        // Save the updated book information
        bookRepository.save(book);
        return true; // Return successful
    }
}
