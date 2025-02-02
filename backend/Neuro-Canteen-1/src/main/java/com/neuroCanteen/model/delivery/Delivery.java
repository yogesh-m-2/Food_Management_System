package com.neuroCanteen.model.delivery;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "delivery")

public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String phoneNumber;
    private String roomNo;
    private String bedNo;
    private String floor;
    private String ward;
    private boolean orderReceived;
    private boolean orderDelivered;
    private String paymentType;
    private boolean codReceiveStatus; 

}
