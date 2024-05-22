package com.sandbox.server.rest.dto;

import com.sandbox.server.entity.ChatUserLink;
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
