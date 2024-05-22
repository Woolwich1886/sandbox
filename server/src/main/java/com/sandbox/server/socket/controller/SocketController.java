package com.sandbox.server.socket.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.sandbox.server.rest.dto.MessageDTO;
import com.sandbox.server.service.ChatCommandService;
import com.sandbox.server.service.ChatNotifyService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SocketController {

    private final ChatCommandService chatCommandService;
    private final ChatNotifyService chatNotifyService;

    @MessageMapping("/chat/{id}")
    @SendTo("/topic/chat/{id}")
    public MessageDTO sendMessage(@DestinationVariable Long id, @Payload MessageDTO dto) {
        var response = chatCommandService.sendMessage(id, dto);
        chatNotifyService.notify(id);
        return response;
    }

}
