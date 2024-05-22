package com.sandbox.server.service;

import com.sandbox.server.data.ChatRepository;
import com.sandbox.server.data.MessageRepository;
import com.sandbox.server.entity.Chat;
import com.sandbox.server.entity.Message;
import com.sandbox.server.entity.User;
import com.sandbox.server.rest.dto.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatCommandService {

    private final ChatRepository chatRepository;
    private final UserQueryService userQueryService;
    private final MessageRepository messageRepository;


    @Transactional
    public MessageDTO sendMessage(Long dialogId, MessageDTO dto) {
        var dialog = chatRepository.getReferenceById(dialogId);
        var author = userQueryService.getById(dto.getAuthor().getId());
        return MessageDTO.toDTO(createMessage(dto.getContent(), dialog, author));
    }

    private Message createMessage(String content, Chat chat, User author) {
        var message = new Message();
        message.setChat(chat);
        message.setContent(content);
        message.setSendOn(LocalDateTime.now());
        message.setAuthor(author);
        return messageRepository.save(message);
    }
}
