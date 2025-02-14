package com.neuroCanteen.model.payment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;  // Razorpay order ID
    private String paymentId;  // Razorpay payment ID
    private String paymentStatus;  // Payment status: "Success", "Failed"
    private String paymentMethod;  // Payment method, e.g., "Credit Card"
    private double amount;  // Payment amount
    private String createdAt;  // Payment creation timestamp
}
