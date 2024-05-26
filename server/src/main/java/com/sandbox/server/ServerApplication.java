package com.sandbox.server;

import com.sandbox.server.data.ChatRepository;
import com.sandbox.server.data.ChatUserLinkRepository;
import com.sandbox.server.data.MessageRepository;
import com.sandbox.server.data.UserRepository;
import com.sandbox.server.entity.Chat;
import com.sandbox.server.entity.ChatUserLink;
import com.sandbox.server.entity.Message;
import com.sandbox.server.entity.User;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.time.LocalDateTime;

@SpringBootApplication
@EntityScan(basePackages = "com.sandbox.server.entity")
@EnableJpaRepositories
@RequiredArgsConstructor
public class ServerApplication {

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final ChatUserLinkRepository chatUserLinkRepository;
    private final MessageRepository messageRepository;

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @PostConstruct
    private void init() {
        var bojack = createUser("Конь Боджек");
        var tony = createUser("Тони Сопрано");
        var lebowski = createUser("Большой Лебовски");

        var chatBojackTony = chatRepository.save(new Chat());
        var chatTonylebowski = chatRepository.save(new Chat());

        createUserDialogLink(bojack, chatBojackTony);
        createUserDialogLink(tony, chatBojackTony);
        createUserDialogLink(lebowski, chatTonylebowski);
        createUserDialogLink(tony, chatTonylebowski);

        createMessage(chatBojackTony, bojack, "Привет, Тони, как дела?");
        createMessage(chatTonylebowski, tony, "Где деньги, Лебовски?");
    }

    private User createUser(String name) {
        var user = new User();
        user.setName(name);
        return userRepository.save(user);
    }

    private ChatUserLink createUserDialogLink(User user, Chat chat) {
        var chatUserLink = new ChatUserLink();
        chatUserLink.setUser(user);
        chatUserLink.setChat(chat);
        return chatUserLinkRepository.save(chatUserLink);
    }

    private void createMessage(Chat chat, User author, String content) {
        var message = new Message();
        message.setAuthor(author);
        message.setChat(chat);
        message.setContent(content);
        message.setSendOn(LocalDateTime.now());
        messageRepository.save(message);
    }

}
