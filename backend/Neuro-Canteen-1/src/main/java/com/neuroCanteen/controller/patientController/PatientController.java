package com.neuroCanteen.controller.patientController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neuroCanteen.model.patient.Patient;
import com.neuroCanteen.service.PatientService;

@RestController
@RequestMapping("/api/patient")
public class PatientController {
    
     @Autowired
    private PatientService patientService;

    @PostMapping("/add")
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }

    @PutMapping("/update/{id}")
    public Patient updatePatient(@PathVariable int id, @RequestBody Patient patient) {
        return patientService.updatePatient(id, patient);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePatient(@PathVariable int id) {
        patientService.deletePatient(id);
        return "Patient Deleted Successfully!";
    }

    @GetMapping("/all")
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable int id) {
        return patientService.getPatientById(id);
    }
}


