package com.neuroCanteen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.patient.Patient;
@Repository
public interface PatientRepository  extends JpaRepository<Patient, Integer>{
    List<Patient> findByFloor(String floor);
    List<Patient> findByWard(String ward);
    List<Patient> findByRoomNo(String roomNo);
    List<Patient> findByBedNo(String bedNo);
}
