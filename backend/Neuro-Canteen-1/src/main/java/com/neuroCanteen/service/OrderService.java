package com.neuroCanteen.service;

import java.util.List;
import java.util.Optional;

import com.neuroCanteen.model.order.DeliveryStatus;
import com.neuroCanteen.model.order.Order;
import com.neuroCanteen.model.order.Order.OrderStatus;

public interface OrderService {
    List<Order> getAllOrders();
    Optional<Order> getOrderById(Long id);
    List<Order> getOrdersByUserId(String orderedUserId);
    List<Order> getOrdersByRoleAndUserId(String orderedRole, String orderedUserId); // New method
    Order createOrder(Order order);
    Order updateOrder(Long id, Order order);
    void deleteOrder(Long id);
    Order updateOrderStatus(Long orderId, OrderStatus orderStatus);
    Order updateDeliveryStatus(Long orderId, DeliveryStatus deliveryStatus);
    Order updatePaymentReceived(Long orderId, boolean paymentReceived);
    List<Order> getOrdersOutForDelivery();
}
