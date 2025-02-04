package com.neuroCanteen.service;

import java.util.List;
import java.util.Optional;
import com.neuroCanteen.model.order.Order;

public interface OrderService {
    List<Order> getAllOrders();
    Optional<Order> getOrderById(Long id);
    List<Order> getOrdersByUserId(String orderedUserId);
    List<Order> getOrdersByRoleAndUserId(String orderedRole, String orderedUserId); // New method
    Order createOrder(Order order);
    Order updateOrder(Long id, Order order);
    void deleteOrder(Long id);
}
