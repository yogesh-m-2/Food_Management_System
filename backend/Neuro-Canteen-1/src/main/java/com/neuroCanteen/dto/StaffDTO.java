package com.neuroCanteen.dto;

import com.neuroCanteen.model.staff.Staff;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StaffDTO {
    private int id;
    private String employeeId;
    private String name;
    private String department;
    private String role;
    private String mobileNumber;
    private String paymentDetails;

    public static StaffDTO fromStaff(Staff staff) {
        return new StaffDTO(
            staff.getId(),
            staff.getEmployeeId(),
            staff.getName(),
            staff.getDepartment(),
            staff.getRole(),
            staff.getMobileNumber(),
            staff.getPaymentDetails()
        );
    }
} 