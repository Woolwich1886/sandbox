package com.sandbox.server.rest.dto;

import com.sandbox.server.entity.Message;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class MessageDTO {

    private String content;
    private UserDTO author;
    private LocalDateTime sendOn;

    public static MessageDTO toDTO(Message entity) {
        var dto = new MessageDTO();
        dto.setAuthor(UserDTO.toDTO(entity.getAuthor()));
        dto.setContent(entity.getContent());
        dto.setSendOn(entity.getSendOn());
        return dto;
    }
}
