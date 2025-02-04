package com.neuroCanteen.model.order;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus; // Pending, Completed, Failed

    private LocalDateTime orderDateTime; // Timestamp of the order

    // Address Field
    private String address; // Full address of the delivery location

    // Constructors
    public Order() {}

    public Order(String orderedRole, String orderedName, String orderedUserId, String itemName, int quantity, String category, double price, OrderStatus orderStatus, String paymentType, PaymentStatus paymentStatus, LocalDateTime orderDateTime, String address) {
        this.orderedRole = orderedRole;
        this.orderedName = orderedName;
        this.orderedUserId = orderedUserId;
        this.itemName = itemName;
        this.quantity = quantity;
        this.category = category;
        this.price = price;
        this.orderStatus = orderStatus;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.orderDateTime = orderDateTime;
        this.address = address;
    }

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

    // Getters and Setters
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getOrderedRole() {
        return orderedRole;
    }

    public void setOrderedRole(String orderedRole) {
        this.orderedRole = orderedRole;
    }

    public String getOrderedName() {
        return orderedName;
    }

    public void setOrderedName(String orderedName) {
        this.orderedName = orderedName;
    }

    public String getOrderedUserId() {
        return orderedUserId;
    }

    public void setOrderedUserId(String orderedUserId) {
        this.orderedUserId = orderedUserId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public LocalDateTime getOrderDateTime() {
        return orderDateTime;
    }

    public void setOrderDateTime(LocalDateTime orderDateTime) {
        this.orderDateTime = orderDateTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
