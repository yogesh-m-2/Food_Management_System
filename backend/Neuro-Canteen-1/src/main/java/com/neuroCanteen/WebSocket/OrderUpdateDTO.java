package com.neuroCanteen.WebSocket;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderUpdateDTO {
    
    private int orderId;
    private String orderedRole;
    private String orderedName;
    private String orderedUserId;
    private String itemName;
    private int quantity;
    private String category;
    private double price;
    private String orderStatus;
    private String paymentType;
    private boolean paymentReceived;
    private String paymentStatus;
    private LocalDateTime orderDateTime;
    private String deliveryStatus;
    private String address;
    private String phoneNo;
}
