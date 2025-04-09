package com.example.myproject.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "borrowed_books")
public class BorrowedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long bookId;

    private LocalDate borrowDate;
    private LocalDate returnDate;

    private boolean isReturned = false;

    private String username;
    private String bookTitle;


    // Getters and Setters

}
