package com.neuroCanteen.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.neuroCanteen.model.order.Order;
import com.neuroCanteen.repository.OrderRepository;
import com.neuroCanteen.service.OrderService;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Retrieve all orders.
     */
    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /**
     * Retrieve an order by its ID.
     */
    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    /**
     * Retrieve orders by orderedUserId.
     */
    @Override
    public List<Order> getOrdersByUserId(String orderedUserId) {
        return orderRepository.findByOrderedUserId(orderedUserId);
    }

    /**
     * Create a new order.
     */
    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrdersByRoleAndUserId(String orderedRole, String orderedUserId) {
        // Call the repository method to fetch orders based on both orderedRole and orderedUserId
        return orderRepository.findByOrderedRoleAndOrderedUserId(orderedRole, orderedUserId);
    }

    /**
     * Update an existing order.
     */
    @Override
    public Order updateOrder(Long id, Order updatedOrder) {
        return orderRepository.findById(id).map(order -> {
            order.setOrderedRole(updatedOrder.getOrderedRole());
            order.setOrderedName(updatedOrder.getOrderedName());
            order.setOrderedUserId(updatedOrder.getOrderedUserId());
            order.setItemName(updatedOrder.getItemName());
            order.setQuantity(updatedOrder.getQuantity());
            order.setCategory(updatedOrder.getCategory());
            order.setPrice(updatedOrder.getPrice());
            order.setOrderStatus(updatedOrder.getOrderStatus());
            order.setPaymentType(updatedOrder.getPaymentType());
            order.setPaymentStatus(updatedOrder.getPaymentStatus());
            order.setOrderDateTime(updatedOrder.getOrderDateTime());
            order.setAddress(updatedOrder.getAddress());
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
    }

    /**
     * Delete an order by ID.
     */
    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
