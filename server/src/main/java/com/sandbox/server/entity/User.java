package com.sandbox.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "app_user")
public class User extends BaseEntity {

    /**
     * Имя пользователя
     */
    @Column(name = "name", nullable = false, length = 20)
    private String name;
}
