package com.example.myproject.repository;


import com.example.myproject.models.BorrowedBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowedBookRepository extends JpaRepository<BorrowedBook, Long> {
    List<BorrowedBook> findByUserIdAndIsReturnedFalse(Long userId);
}
