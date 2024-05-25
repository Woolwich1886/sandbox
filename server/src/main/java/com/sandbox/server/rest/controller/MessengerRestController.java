package com.sandbox.server.rest.controller;

import com.sandbox.server.rest.dto.ChatPreviewInfoDTO;
import com.sandbox.server.rest.dto.MessageDTO;
import com.sandbox.server.rest.dto.UserDTO;
import com.sandbox.server.service.ChatQueryService;
import com.sandbox.server.service.UserQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "rest")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class MessengerRestController {

    private final UserQueryService userQueryService;
    private final ChatQueryService chatQueryService;

    @GetMapping(path = "users")
    public ResponseEntity<List<UserDTO>> getUsers() {
        return new ResponseEntity<>(userQueryService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping(path = "users/{id}/info")
    public ResponseEntity<UserDTO> getUserChatInfo(@PathVariable Long id) {
        return new ResponseEntity<>(userQueryService.getUser(id), HttpStatus.OK);
    }

    @GetMapping(path = "chat/{id}/messages")
    public ResponseEntity<List<MessageDTO>> get(@PathVariable Long id) {
        return new ResponseEntity<>(chatQueryService.findAllMessagesByChatId(id), HttpStatus.OK);
    }

    @GetMapping(path = "users/{id}/chat-list")
    public ResponseEntity<List<ChatPreviewInfoDTO>> getUserChatList(@PathVariable Long id) {
        return new ResponseEntity<>(chatQueryService.findAllChatUserLinksByUserId(id), HttpStatus.OK);
    }

}
