package com.sandbox.server.data;

import com.sandbox.server.entity.Chat;
import com.sandbox.server.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findAllByChatId(Long chatId);

    Optional<Message> findFirstByChatOrderBySendOnDesc(Chat chat);

}
