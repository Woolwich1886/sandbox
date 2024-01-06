package com.sandbox.server.socket.controller;

import com.sandbox.server.rest.dto.UserDTO;
import com.sandbox.server.service.ChatCommandService;
import com.sandbox.server.service.ChatQueryService;
import com.sandbox.server.socket.dto.ChatPreviewInfoDTO;
import com.sandbox.server.socket.dto.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class SocketController {

    private final ChatQueryService chatQueryService;
    private final ChatCommandService chatCommandService;
    private final SimpMessagingTemplate simpMessagingTemplate;

//    @SendTo("/topic/user/{id}/chat-list")
//    public List<ChatPreviewInfoDTO> userChatsList(@DestinationVariable Long id) {
//        System.out.println("here!");
//        System.out.println(id);
//        var result =chatQueryService.findAllChatUserLinksByUserId(id);
//        System.out.println(result);
//        return result;
//    }

    @MessageMapping("/chat/{id}")
    @SendTo("/topic/chat/{id}")
    public MessageDTO sendMessage(@DestinationVariable Long id, @Payload MessageDTO dto) {
        var response = chatCommandService.sendMessage(id, dto);
        notify(id);
        System.out.println("sended!");
        return response;
    }

    @Transactional
    private void notify(Long chatId) {
        var list = chatQueryService.findAllChatUserLinksByChatId(chatId);
        var notifiers = list.stream().map(ChatPreviewInfoDTO::getUser).map(UserDTO::getId).toList();
        list.forEach(dto -> notifiers.stream()
                .filter(id -> id != dto.getUser().getId())
                .forEach(id -> simpMessagingTemplate.convertAndSend("/topic/user/" + id + "/chat-list", dto)));
    }
}
