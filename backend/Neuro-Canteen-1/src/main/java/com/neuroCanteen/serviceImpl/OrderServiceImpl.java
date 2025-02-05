package com.neuroCanteen.serviceImpl;

import com.neuroCanteen.WebSocket.OrderWebSocketHandler;
import com.neuroCanteen.model.order.DeliveryStatus;
import com.neuroCanteen.model.order.Order;
import com.neuroCanteen.model.order.Order.OrderStatus;
import com.neuroCanteen.model.order.Order.PaymentStatus;

import com.neuroCanteen.repository.OrderRepository;
import com.neuroCanteen.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
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
public Order createOrder(Order order) {
    Order savedOrder = orderRepository.save(order);

    // Send WebSocket notification
    String message = "New order received: " + savedOrder.getItemName() + 
                     " (Quantity: " + savedOrder.getQuantity() + ")\n" +
                     "Ordered by: " + savedOrder.getOrderedName() + 
                     " (Role: " + savedOrder.getOrderedRole() + ")\n" +
                     "Category: " + savedOrder.getCategory() + "\n" +
                     "Price: $" + savedOrder.getPrice() + "\n" +
                     "Payment Type: " + savedOrder.getPaymentType() + "\n" +
                     "Payment Received: " + (savedOrder.isPaymentRecived() ? "Yes" : "No") + "\n" +
                     "Order Status: " + savedOrder.getOrderStatus() + "\n" +
                     "Delivery Status: " + savedOrder.getDeliveryStatus() + "\n" +
                     "Address: " + savedOrder.getAddress();

    OrderWebSocketHandler.sendOrderUpdate(message);
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
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        return orderRepository.findByOrderId(orderId).map(order -> {
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
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
