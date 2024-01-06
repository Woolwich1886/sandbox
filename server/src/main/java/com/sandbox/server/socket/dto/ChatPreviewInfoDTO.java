package com.sandbox.server.socket.dto;

import com.sandbox.server.entity.ChatUserLink;
import com.sandbox.server.rest.dto.UserDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatPreviewInfoDTO {

    private Long id;
    private MessageDTO lastMessage;
    private UserDTO user;

    public static ChatPreviewInfoDTO toDTO(ChatUserLink entity) {
        var dto = new ChatPreviewInfoDTO();
        dto.setId(entity.getChat().getId());
        dto.setUser(UserDTO.toDTO(entity.getUser()));
        return dto;
    }

}
