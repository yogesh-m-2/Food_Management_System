package com.neuroCanteen.controller.orderController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.neuroCanteen.model.order.DeliveryStatus;
import com.neuroCanteen.model.order.Order;
import com.neuroCanteen.model.order.Order.OrderStatus;

import com.neuroCanteen.service.OrderService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Optional<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable String userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/out-for-delivery")
    public List<Order> getOrdersOutForDelivery() {
        return orderService.getOrdersOutForDelivery();
    }

    @GetMapping("/filter")
    public List<Order> getOrdersByRoleAndUserId(
            @RequestParam String orderedRole,
            @RequestParam String orderedUserId) {
        return orderService.getOrdersByRoleAndUserId(orderedRole, orderedUserId);
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order updatedOrder) {
        return orderService.updateOrder(id, updatedOrder);
    }

    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return "Order deleted with ID: " + id;
    }

    @PatchMapping("/{id}/status")
    // public Order updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus orderStatus) {
    //     return orderService.updateOrderStatus(id, orderStatus);
    // }
    public Order updateOrderStatus(@PathVariable Long id, @RequestParam String orderStatus) {
    try {
        OrderStatus status = OrderStatus.valueOf(orderStatus.toUpperCase()); // Ensure case-insensitivity
        return orderService.updateOrderStatus(id, status);
    } catch (IllegalArgumentException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid order status: " + orderStatus);
    }
}
 
    @PatchMapping("/{id}/delivery-status")
    public Order updateDeliveryStatus(@PathVariable Long id, @RequestParam DeliveryStatus deliveryStatus) {
        return orderService.updateDeliveryStatus(id, deliveryStatus);
    }

    @PatchMapping("/{id}/payment-received")
    public Order updatePaymentReceived(@PathVariable Long id, @RequestParam boolean paymentReceived) {
        return orderService.updatePaymentReceived(id, paymentReceived);
    }
}
