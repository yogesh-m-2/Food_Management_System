package com.neuroCanteen.model.patient;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
   
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    private String uhid; // Unique Hospital ID
    private String ipId; // In-Patient ID
    private String name;
    private int age;
    private String gender;
    private String primaryConsultant;
    private String diagnosisDescription;
    
    private LocalDateTime admissionDateTime;
    private LocalDateTime dischargeDateTime;
    private String patientStatus;

    private String roomNo;
    private String bedNo;
    private String floor;
    private String ward;
    private String patientMobileNo;
    private String attendantContact;

    private String combo;
    private String allergies;
    private String dislikes;

}
