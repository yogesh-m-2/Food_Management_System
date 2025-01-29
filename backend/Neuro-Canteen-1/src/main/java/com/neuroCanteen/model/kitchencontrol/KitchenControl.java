package com.neuroCanteen.model.kitchencontrol;

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
public class KitchenControl {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String orderStatus; // "Pending", "Cooking", "Ready"
    private String paymentStatus; // "Paid", "Pending"
    private String orderDetails; // Includes menu items and quantity
}
