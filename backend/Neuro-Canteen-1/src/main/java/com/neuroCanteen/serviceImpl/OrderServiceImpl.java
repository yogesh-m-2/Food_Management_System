package com.neuroCanteen.serviceImpl;

import com.neuroCanteen.WebSocket.OrderWebSocketHandler;
import com.neuroCanteen.model.order.DeliveryStatus;
import com.neuroCanteen.model.order.Order;
import com.neuroCanteen.model.order.Order.OrderStatus;
import com.neuroCanteen.model.order.Order.PaymentStatus;

import com.neuroCanteen.repository.OrderRepository;
import com.neuroCanteen.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getOrdersOutForDelivery() {
        return orderRepository.findByOrderStatus(Order.OrderStatus.OUT_FOR_DELIVERY);
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public List<Order> getOrdersByUserId(String orderedUserId) {
        return orderRepository.findByOrderedUserId(orderedUserId);
    }

    @Override
    public List<Order> getOrdersByRoleAndUserId(String orderedRole, String orderedUserId) {
        return orderRepository.findByOrderedRoleAndOrderedUserId(orderedRole, orderedUserId);
    }

    // @Override
    // public Order createOrder(Order order) {
    //     order.setOrderDateTime(java.time.LocalDateTime.now());
    //     return orderRepository.save(order);
    // }

    @Override
    public List<Order> getFilteredOrders(String orderedRole, String paymentType, PaymentStatus paymentStatus) {
        return orderRepository.findByOrderedRoleAndPaymentTypeAndPaymentStatus(
            orderedRole,
            paymentType,
            paymentStatus
        );
    }
    

    @Override
    public Order createOrder(Order order) {
        Order savedOrder = orderRepository.save(order);

        // Send WebSocket notification for new order
        String jsonString = "{ " +
            "\"orderId\": \"" + savedOrder.getOrderId() + "\", " +
            "\"orderedRole\": \"" + savedOrder.getOrderedRole() + "\", " +
            "\"orderedName\": \"" + savedOrder.getOrderedName() + "\", " +
            "\"orderedUserId\": \"" + savedOrder.getOrderedUserId() + "\", " +
            "\"itemName\": \"" + savedOrder.getItemName() + "\", " +
            "\"quantity\": " + savedOrder.getQuantity() + ", " +
            "\"category\": \"" + savedOrder.getCategory() + "\", " +
            "\"price\": " + savedOrder.getPrice() + ", " +
            "\"orderStatus\": \"" + savedOrder.getOrderStatus() + "\", " +
            "\"paymentType\": \"" + savedOrder.getPaymentType() + "\", " +
            "\"paymentRecived\": " + savedOrder.isPaymentRecived() + ", " +
            "\"paymentStatus\": \"" + savedOrder.getPaymentStatus() + "\", " +
            "\"orderDateTime\": \"" + savedOrder.getOrderDateTime() + "\", " +
            "\"deliveryStatus\": \"" + savedOrder.getDeliveryStatus() + "\", " +
            "\"address\": \"" + savedOrder.getAddress() + "\", " +
            "\"phoneNo\": \"" + savedOrder.getPhoneNo() + "\"" +
        "}";

        OrderWebSocketHandler.sendNewOrder(jsonString);
        return savedOrder;
    }

    @Override
    public Order updateOrder(Long id, Order order) {
        return orderRepository.findById(id).map(existingOrder -> {
            existingOrder.setItemName(order.getItemName());
            existingOrder.setQuantity(order.getQuantity());
            existingOrder.setCategory(order.getCategory());
            existingOrder.setPrice(order.getPrice());
            existingOrder.setOrderStatus(order.getOrderStatus());
            existingOrder.setPaymentType(order.getPaymentType());
            existingOrder.setPaymentStatus(order.getPaymentStatus());
            existingOrder.setDeliveryStatus(order.getDeliveryStatus());
            existingOrder.setAddress(order.getAddress());
            return orderRepository.save(existingOrder);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public void markOrdersAsPaid(List<Long> orderIds) {
        List<Order> orders = orderRepository.findAllById(orderIds);

        for (Order order : orders) {
            order.setPaymentRecived(true);
            order.setPaymentStatus(Order.PaymentStatus.COMPLETED);
        }

        orderRepository.saveAll(orders);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus(orderStatus);
        Order updatedOrder = orderRepository.save(order);

        // Send WebSocket notification for order status update
        String jsonString = "{ " +
            "\"orderId\": \"" + updatedOrder.getOrderId() + "\", " +
            "\"orderedRole\": \"" + updatedOrder.getOrderedRole() + "\", " +
            "\"orderedName\": \"" + updatedOrder.getOrderedName() + "\", " +
            "\"orderedUserId\": \"" + updatedOrder.getOrderedUserId() + "\", " +
            "\"itemName\": \"" + updatedOrder.getItemName() + "\", " +
            "\"quantity\": " + updatedOrder.getQuantity() + ", " +
            "\"category\": \"" + updatedOrder.getCategory() + "\", " +
            "\"price\": " + updatedOrder.getPrice() + ", " +
            "\"orderStatus\": \"" + updatedOrder.getOrderStatus() + "\", " +
            "\"paymentType\": \"" + updatedOrder.getPaymentType() + "\", " +
            "\"paymentRecived\": " + updatedOrder.isPaymentRecived() + ", " +
            "\"paymentStatus\": \"" + updatedOrder.getPaymentStatus() + "\", " +
            "\"orderDateTime\": \"" + updatedOrder.getOrderDateTime() + "\", " +
            "\"deliveryStatus\": \"" + updatedOrder.getDeliveryStatus() + "\", " +
            "\"address\": \"" + updatedOrder.getAddress() + "\", " +
            "\"phoneNo\": \"" + updatedOrder.getPhoneNo() + "\"" +
        "}";

        OrderWebSocketHandler.sendOrderUpdate(jsonString);
        return updatedOrder;
    }

    @Override
    public Order updatePaymentReceived(Long orderId, boolean paymentReceived) {
        return orderRepository.findByOrderId(orderId).map(order -> {
            order.setPaymentRecived(paymentReceived);
            order.setPaymentStatus(paymentReceived ? PaymentStatus.COMPLETED : PaymentStatus.PENDING);
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public Order updateDeliveryStatus(Long orderId, DeliveryStatus deliveryStatus) {
        return orderRepository.findByOrderId(orderId).map(order -> {
            order.setDeliveryStatus(deliveryStatus);
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
        
    }
}
