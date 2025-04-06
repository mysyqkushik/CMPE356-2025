package com.example.myproject.repository;

import com.example.myproject.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
        List<Book> findTop9ByOrderByPublicationDateDesc();

}
