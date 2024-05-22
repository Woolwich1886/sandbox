package com.sandbox.server.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketStompConfiguration implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/socket").setAllowedOrigins("*");
    }

}
//
//
//@Configuration
//@EnableWebSocket
//public class WebSocketConfiguration implements WebSocketConfigurer {
//    @Override
//    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        registry.addHandler(chatListHandler(), "socket/user/{id}/chat-list").setAllowedOrigins("*");
//        registry.addHandler(anotherHandler(), "another/{id}").setAllowedOrigins("*");
//    }
//
//    @Bean
//    public WebSocketHandler chatListHandler() {
//
//
//
//        return new ChatListHandler();
//    }
//
//    @RequiredArgsConstructor
//    public class ChatListHandler extends TextWebSocketHandler {
//        private final ChatQueryService chatQueryService;
//
//        @Override
//        public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//            ObjectMapper om = new ObjectMapper();
//            var result = chatQueryService.findAllChatUserLinksByUserId((Long) session.getAttributes().get("id"));
//            TextMessage message = new TextMessage(om.writeValueAsString(result));
//            session.sendMessage(message);
//        }
//
//    }
//
//    @Bean
//    public WebSocketHandler anotherHandler() {
//        return new AnotherHandler();
//    }
//
//    public class AnotherHandler extends TextWebSocketHandler {
//
//        ObjectMapper mapper = new ObjectMapper();
//        @Override
//        protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//            System.out.println(message.getPayload());
//            session.getAttributes().forEach((s, o) -> System.out.println(s));
//            var dto = mapper.readValue(message.getPayload(), MessageDTO.class);
//            var result = new GreetingDTO();
//            result.setContent("Hello, %s, nice to meet you!".formatted(dto.getName()));
//            session.sendMessage(new TextMessage(mapper.writeValueAsString(result)));
//        }
//
//        @Override
//        public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//            //Publishing new stock prices every one second for 100 times
//            TextMessage message = new TextMessage("Hello");
//            session.sendMessage(message);
//        }

//
