package com.neuroCanteen.WebSocket;


    import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class OrderWebSocketHandler extends TextWebSocketHandler {
   
    private static final Set<WebSocketSession> sessions = Collections.newSetFromMap(new ConcurrentHashMap<>());
    private static final ObjectMapper objectMapper = new ObjectMapper();
   
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println(session);
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        sessions.remove(session);
    }

    public static void sendOrderUpdate(String orderUpdate) {
        try {
            //String jsonMessage = objectMapper.writeValueAsString(orderUpdate);
            for (WebSocketSession session : sessions) {
                session.sendMessage(new TextMessage(orderUpdate));
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
}}
public static void sendDeliveryUpdate(String deliveryUpdate) {
    try {
        for (WebSocketSession session : sessions) {
            session.sendMessage(new TextMessage(deliveryUpdate));
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}

}


