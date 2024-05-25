package com.sandbox.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "message")
public class Message extends BaseEntity {

    /**
     * Содержание
     */
    @Column(name = "content", nullable = false, length = 1000)
    private String content;

    /**
     * Автор
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id", nullable = false)
    private User author;

    /**
     * Чат
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    /**
     * Дата отправки
     */
    @Column(name = "send_on", nullable = false)
    private LocalDateTime sendOn;
}
