package com.neuroCanteen.WebSocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new OrderWebSocketHandler(), "/order-updates")
                .setAllowedOriginPatterns(
                    "http://localhost:*",
                    "http://170.187.200.195:*",
                    "http://192.168.43.247:*"
                )
                .withSockJS();
                
        registry.addHandler(new OrderWebSocketHandler(), "/delivery-update")
                .setAllowedOriginPatterns(
                    "http://localhost:*",
                    "http://170.187.200.195:*",
                    "http://192.168.43.247:*"
                )
                .withSockJS();
    }
}
