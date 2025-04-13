package com.example.myproject.repository;

import com.example.myproject.models.Messages;  // Changed from org.aspectj.bridge.Message
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface MessageRepository extends JpaRepository<Messages, Long> {  // Changed from Message to Messages
    List<Messages> findByToUserIdOrderByTimestampDesc(Long toUserId);     // Changed return type
    List<Messages> findByFromUserIdOrderByTimestampDesc(Long fromUserId); // Changed return type

    @Query("SELECT COUNT(m) FROM Messages m WHERE m.toUserId = :userId AND m.isRead = false")
    int countUnreadMessages(@Param("userId") int userId);

}

