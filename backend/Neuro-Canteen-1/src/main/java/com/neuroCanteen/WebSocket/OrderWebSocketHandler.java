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
        System.out.println("New WebSocket connection established: " + session);
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        System.out.println("WebSocket connection closed: " + session);
        sessions.remove(session);
    }

    public static void sendOrderUpdate(String orderUpdate) {
        try {
            String message = String.format("{\"type\": \"ORDER_UPDATED\", \"payload\": %s}", orderUpdate);
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sendNewOrder(String orderData) {
        try {
            String message = String.format("{\"type\": \"ORDER_CREATED\", \"payload\": %s}", orderData);
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sendDeliveryUpdate(String deliveryUpdate) {
        try {
            String message = String.format("{\"type\": \"DELIVERY_UPDATED\", \"payload\": %s}", deliveryUpdate);
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}


