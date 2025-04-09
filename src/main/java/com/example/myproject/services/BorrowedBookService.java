package com.example.myproject.services;

import com.example.myproject.models.Book;
import com.example.myproject.models.BorrowedBook;
import com.example.myproject.repository.BookRepository;
import com.example.myproject.repository.BorrowedBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BorrowedBookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BorrowedBookRepository borrowedBookRepository; // ✅ Inject repository

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


            // ✅ Create new BorrowedBook record
            BorrowedBook borrowedBook = new BorrowedBook();
            borrowedBook.setUserId(userId);
            borrowedBook.setBookId(bookId);
            borrowedBook.setBorrowDate(LocalDate.now());
            borrowedBook.setReturnDate(LocalDate.now().plusMonths(1));
            borrowedBook.setReturned(false);

            borrowedBookRepository.save(borrowedBook); // ✅ Save to SQL table

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

        // ✅ Update borrow record
        BorrowedBook borrowedBook = borrowedBookRepository
                .findByUserIdAndIsReturnedFalse(userId)
                .stream()
                .filter(bb -> bb.getBookId().equals(bookId))
                .findFirst()
                .orElse(null);

        if (borrowedBook != null) {
            borrowedBook.setReturned(true);
            borrowedBook.setReturnDate(LocalDate.now());
            borrowedBookRepository.save(borrowedBook);

        return true; // Return successful
    }
        return false;
    }
}
