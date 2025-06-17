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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OrderWebSocketHandler extends TextWebSocketHandler {
   
    private static final Logger logger = LoggerFactory.getLogger(OrderWebSocketHandler.class);
    private static final Set<WebSocketSession> sessions = Collections.newSetFromMap(new ConcurrentHashMap<>());
    private static final ObjectMapper objectMapper = new ObjectMapper();
   
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        logger.info("New WebSocket connection established: {}", session.getId());
        sessions.add(session);
        try {
            session.sendMessage(new TextMessage("{\"type\": \"CONNECTED\", \"message\": \"Successfully connected to WebSocket\"}"));
        } catch (IOException e) {
            logger.error("Error sending connection confirmation message", e);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) {
        logger.info("WebSocket connection closed: {} with status: {}", session.getId(), status);
        sessions.remove(session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        logger.error("WebSocket transport error for session {}: {}", session.getId(), exception.getMessage());
        sessions.remove(session);
    }

    public static void sendOrderUpdate(String orderUpdate) {
        try {
            String message = String.format("{\"type\": \"ORDER_UPDATED\", \"payload\": %s}", orderUpdate);
            logger.info("Sending order update: {}", message);
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                    logger.info("Order update sent to session: {}", session.getId());
                }
            }
        } catch (IOException e) {
            logger.error("Error sending order update", e);
        }
    }

    public static void sendNewOrder(String orderData) {
        try {
            String message = String.format("{\"type\": \"ORDER_CREATED\", \"payload\": %s}", orderData);
            logger.info("Sending new order: {}", message);
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                    logger.info("New order sent to session: {}", session.getId());
                }
            }
        } catch (IOException e) {
            logger.error("Error sending new order", e);
        }
    }

    public static void sendDeliveryUpdate(String deliveryUpdate) {
        try {
            String message = String.format("{\"type\": \"DELIVERY_UPDATED\", \"payload\": %s}", deliveryUpdate);
            logger.info("Sending delivery update: {}", message);
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                    logger.info("Delivery update sent to session: {}", session.getId());
                }
            }
        } catch (IOException e) {
            logger.error("Error sending delivery update", e);
        }
    }
}


