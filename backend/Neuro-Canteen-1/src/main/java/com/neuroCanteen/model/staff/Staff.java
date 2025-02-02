package com.neuroCanteen.model.staff;

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
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String employeeId;
    private String name;
    private String department;
    private String role; // e.g., Dietitian, Kitchen Staff, Delivery Boy
    private String mobileNumber;
    private String password;
    private String paymentDetails; // UPI, Credits Taken by Staff
}
