package com.neuroCanteen.model.order;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String patientName;
    private String items; // Comma-separated list of item names
    private double totalPrice;
    private String orderStatus; // "Cooking", "Sent for delivery"
    private String deliveryDetails;
    private String paymentMode; // "Cash", "UPI", etc.
}
