package com.example.myproject.services;


import com.example.myproject.models.Messages;
import com.example.myproject.repository.MessageRepository;
import jakarta.transaction.Transactional;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Messages> getMessagesForUser(int userId) {
        return messageRepository.findByToUserIdOrderByTimestampDesc(Long.valueOf(userId));
    }

    public int getUnreadMessageCount(int userId) {
        return messageRepository.countUnreadMessages(userId);
    }

    @Transactional
    public void markMessagesAsRead(int userId) {
        List<Messages> messages = messageRepository.findByToUserIdOrderByTimestampDesc(Long.valueOf(userId));
        for (Messages msg : messages) {
            if (!msg.isRead()) {
                msg.setIsRead(true);
                messageRepository.save(msg);
            }
        }
    }

}
