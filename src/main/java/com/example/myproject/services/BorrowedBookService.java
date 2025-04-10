package com.example.myproject.services;

import com.example.myproject.models.Book;
import com.example.myproject.models.BorrowedBook;
import com.example.myproject.repository.BookRepository;
import com.example.myproject.repository.BorrowedBookRepository;
import com.example.myproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowedBookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BorrowedBookRepository borrowedBookRepository;

    @Autowired
    private UserRepository userRepository;

    // Borrow Book
    public boolean borrowBook(Long userId, Long bookId, LocalDate borrowDate, LocalDate returnDate) {
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

            borrowedBook.setBookTitle(book.getTitle());
            borrowedBook.setUsername(userRepository.findById(userId).get().getUsername());

            borrowedBookRepository.save(borrowedBook); // ✅ Save to SQL table

            return true; // Borrow successful
        } else {
            return false; // No available copies of the book
        }
    }

    public boolean returnBook(Long userId, Long bookId, LocalDate borrowDate, LocalDate returnDate) {
        // Step 1: Find the book
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // Step 2: Increase book quantity since it's being returned
        book.setQuantity(book.getQuantity() + 1);
        bookRepository.save(book);

        // Step 3: Find the borrowed record by userId and bookId
        BorrowedBook borrowedBook = borrowedBookRepository
                .findByUserIdAndIsReturnedFalse(userId)
                .stream()
                .filter(bb -> bb.getBookId().equals(bookId))
                .findFirst()
                .orElse(null);

        if (borrowedBook != null) {
            // Delete the borrowedBook record when the book is returned
            borrowedBookRepository.delete(borrowedBook);
            return true;
        }
        return false; // No borrowed book found for the given userId and bookId
    }



    public List<BorrowedBook> getAllBorrowedBooks() {
        return borrowedBookRepository.findAll();
    }

    public List<BorrowedBook> getBorrowedBooksByUserId(Long userId) {
        return borrowedBookRepository.findByUserId(userId);
    }


    public List<BorrowedBook> getBorrowedBooksByUsername(String username) {
        return borrowedBookRepository.findByUsername(username);
    }

}
