package com.neuroCanteen.model.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderId; // Unique Order ID

    private String orderedRole; // Role: Dietitian, Patient, Staff
    private String orderedName; // Profile name of the user who ordered
    private String orderedUserId; // User ID of the person who ordered
    
    private String itemName; // Name of the ordered item
    private int quantity; // Quantity of items ordered
    private String category; // Category of the food item
    private double price; // Price of the item

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus; // Received, Prepared, Out for Delivery

    private String paymentType; // Cash, Card, UPI, etc.
    private String PhoneNo;
    private boolean paymentRecived;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus; // Pending, Completed, Failed

    private LocalDateTime orderDateTime; // Timestamp of the order
    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;

    // Address Field
    private String address; // Full address of the delivery location


    public enum OrderStatus {
        RECEIVED,
        PREPARED,
        OUT_FOR_DELIVERY
    }

    public enum PaymentStatus {
        PENDING,
        COMPLETED,
        FAILED
    }

    
}
