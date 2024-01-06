package com.sandbox.server.rest.dto;

import com.sandbox.server.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private Long id;
    private String name;

    public static UserDTO toDTO(User entity) {
        var dto = new UserDTO();
        dto.id = entity.getId();
        dto.name = entity.getName();
        return dto;
    }
}
