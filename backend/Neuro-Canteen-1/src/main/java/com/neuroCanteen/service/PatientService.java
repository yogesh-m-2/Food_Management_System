package com.neuroCanteen.service;

import java.util.List;

import com.neuroCanteen.model.patient.Patient;

public interface PatientService {
    Patient createPatient(Patient patient);
    Patient updatePatient(int id, Patient patient);
    void deletePatient(int id);
    List<Patient> getAllPatients();
    Patient getPatientById(int id);

    
}
