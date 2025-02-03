package com.neuroCanteen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.patient.Patient;
@Repository
public interface PatientRepository  extends JpaRepository<Patient, Integer>{
    
}
