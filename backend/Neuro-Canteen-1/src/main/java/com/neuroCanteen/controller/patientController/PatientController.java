package com.neuroCanteen.controller.patientController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/patient")
public class PatientController {
    
     @Autowired
    private PatientService patientService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> createPatient(@RequestBody Patient patient) {
        Map<String, Object> response = new HashMap<>();

        try {
            Patient createdPatient = patientService.createPatient(patient);

            response.put("status", "success");
            response.put("message", "Patient created successfully");
            response.put("data", createdPatient);

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (DataIntegrityViolationException e) {
            response.put("status", "error");
            response.put("message", "Username already exists");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Internal server error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updatePatient(@PathVariable int id, @RequestBody Patient patient) {
        Map<String, Object> response = new HashMap<>();
    
        try {
            Patient updated = patientService.updatePatient(id, patient);
    
            if (updated == null) {
                response.put("status", "error");
                response.put("message", "Patient not found with ID: " + id);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); 
            }
    
            response.put("status", "success");
            response.put("message", "Patient updated successfully");
            response.put("data", updated);
            return new ResponseEntity<>(response, HttpStatus.OK);
    
        } catch (DataIntegrityViolationException e) {
            response.put("status", "error");
            response.put("message", "Username already exists");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT); 
    
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Internal server error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

 public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

   

    @GetMapping("/floors")
public ResponseEntity<List<String>> getAllFloors() {
    return ResponseEntity.ok(patientService.getAllFloors());
}

@GetMapping("/wards/{floor}")
public ResponseEntity<List<String>> getWardsByFloor(@PathVariable String floor) {
    return ResponseEntity.ok(patientService.getWardsByFloor(floor));
}
@GetMapping("/rooms/{floor}/{ward}")
public ResponseEntity<List<String>> getRoomsByFloorAndWard(@PathVariable String floor, @PathVariable String ward) {
    return ResponseEntity.ok(patientService.getRoomsByFloorAndWard(floor, ward));
}

@GetMapping("/beds/{floor}/{ward}/{room}")
public ResponseEntity<List<String>> getBedsByFloorWardAndRoom(
    @PathVariable String floor, 
    @PathVariable String ward, 
    @PathVariable String room) {
    return ResponseEntity.ok(patientService.getBedsByFloorWardAndRoom(floor, ward, room));
}

@GetMapping("/patients/{floor}/{ward}/{room}/{bed}")
public ResponseEntity<List<Patient>> getPatientsByFloorWardRoomAndBed(
    @PathVariable String floor, 
    @PathVariable String ward, 
    @PathVariable String room, 
    @PathVariable String bed) {
    List<Patient> patients = patientService.getPatientsByFloorWardRoomAndBed(floor, ward, room, bed);
    return patients.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(patients);
}

    @GetMapping("/floors/{ward}")
    public ResponseEntity<List<String>> getFloorsByWard(@PathVariable String ward) {
        return ResponseEntity.ok(patientService.getFloorsByWard(ward));
    }

    @GetMapping("/rooms/{floor}")
    public ResponseEntity<List<String>> getRoomsByFloor(@PathVariable String floor) {
        return ResponseEntity.ok(patientService.getRoomsByFloor(floor));
    }

    @GetMapping("/beds/{roomNo}")
    public ResponseEntity<List<String>> getBedsByRoom(@PathVariable String roomNo) {
        return ResponseEntity.ok(patientService.getBedsByRoom(roomNo));
    }

    @GetMapping("/patient/{bedNo}")
    public ResponseEntity<Patient> getPatientByBedNo(@PathVariable String bedNo) {
        Patient patient = patientService.getPatientByBedNo(bedNo);
        return patient != null ? ResponseEntity.ok(patient) : ResponseEntity.notFound().build();
    }

}


