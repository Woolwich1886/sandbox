package com.sandbox.server.service;

import com.sandbox.server.data.UserRepository;
import com.sandbox.server.entity.User;
import com.sandbox.server.rest.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserQueryService {

    private final UserRepository repository;

    public List<UserDTO> getAllUsers() {
        return repository.findAll().stream().map(UserDTO::toDTO).collect(Collectors.toList());
    }

    public UserDTO getUser(Long id) {
        return UserDTO.toDTO(repository.getReferenceById(id));
    }

    public User getById(Long id) {
        return repository.getReferenceById(id);
    }

}
