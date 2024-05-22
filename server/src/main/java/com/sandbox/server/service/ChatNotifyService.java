package com.sandbox.server.service;

import com.sandbox.server.rest.dto.ChatPreviewInfoDTO;
import com.sandbox.server.rest.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatNotifyService {

    private final ChatQueryService chatQueryService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Transactional
    public void notify(Long chatId) {
        var list = chatQueryService.findAllChatUserLinksByChatId(chatId);
        var notifiers = list.stream().map(ChatPreviewInfoDTO::getUser).map(UserDTO::getId).toList();
        list.forEach(dto -> notifiers.stream()
                .filter(id -> id != dto.getUser().getId())
                .forEach(id -> simpMessagingTemplate.convertAndSend("/topic/user/" + id + "/chat-list", dto)));
    }
}
