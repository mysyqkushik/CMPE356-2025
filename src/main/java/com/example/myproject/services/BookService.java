package com.example.myproject.services;

import com.example.myproject.models.Book;
import com.example.myproject.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book updatedBook) {
        Book existingBook = bookRepository.findById(id).orElse(null);
        if (existingBook != null) {
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setGenre(updatedBook.getGenre());
            existingBook.setPublicationDate(updatedBook.getPublicationDate());
            existingBook.setQuantity(updatedBook.getQuantity());
            existingBook.setRating(updatedBook.getRating());
            existingBook.setAddedBy(updatedBook.getAddedBy());
            return bookRepository.save(existingBook);
        }
        return null;
    }

    public boolean deleteBook(Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Book> getLatestBooks() {
        return bookRepository.findTop9ByOrderByPublicationDateDesc();
    }



}
