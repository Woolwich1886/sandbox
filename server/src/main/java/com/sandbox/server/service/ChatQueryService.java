package com.sandbox.server.service;

import com.sandbox.server.data.ChatSpecification;
import com.sandbox.server.data.ChatUserLinkRepository;
import com.sandbox.server.data.MessageRepository;
import com.sandbox.server.entity.ChatUserLink;
import com.sandbox.server.entity.Message;
import com.sandbox.server.socket.dto.ChatPreviewInfoDTO;
import com.sandbox.server.socket.dto.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatQueryService {

    private final ChatUserLinkRepository chatUserLinkRepository;
    private final MessageRepository messageRepository;

    @Transactional(readOnly = true)
    public List<ChatPreviewInfoDTO> findAllChatUserLinksByUserId(Long id) {
        return chatUserLinkRepository.findAll(ChatSpecification.byUserChat(id))
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MessageDTO> findAllMessagesByChatId(Long id) {
        return messageRepository.findAllByChatId(id).stream().map(MessageDTO::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ChatPreviewInfoDTO> findAllChatUserLinksByChatId(Long id) {
        return chatUserLinkRepository.findAllByChatId(id)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private ChatPreviewInfoDTO toDTO(ChatUserLink link) {
        var dto = ChatPreviewInfoDTO.toDTO(link);
        messageRepository.findFirstByChatOrderBySendOnDesc(link.getChat())
                .ifPresent(message -> dto.setLastMessage(MessageDTO.toDTO(message)));
        return dto;
    }
}
