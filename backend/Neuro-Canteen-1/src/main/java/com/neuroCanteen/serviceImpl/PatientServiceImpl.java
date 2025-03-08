package com.neuroCanteen.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuroCanteen.exceptions.ResourceNotFoundException;
import com.neuroCanteen.model.patient.Patient;
import com.neuroCanteen.repository.PatientRepository;
import com.neuroCanteen.service.PatientService;

@Service
public class PatientServiceImpl  implements PatientService {
    
     @Autowired
    private PatientRepository patientRepository;

    @Override
    public Patient createPatient(Patient patient) {
        System.out.println(patient);
        return patientRepository.save(patient);
    }

    @Override
    public Patient updatePatient(int id, Patient patient) {
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + id));

        existingPatient.setUhid(patient.getUhid());
        existingPatient.setIpId(patient.getIpId());
        existingPatient.setName(patient.getName());
        existingPatient.setAge(patient.getAge());
        existingPatient.setGender(patient.getGender());
        existingPatient.setPrimaryConsultant(patient.getPrimaryConsultant());
        existingPatient.setDiagnosisDescription(patient.getDiagnosisDescription());
        existingPatient.setAdmissionDateTime(patient.getAdmissionDateTime());
        existingPatient.setDischargeDateTime(patient.getDischargeDateTime());
        existingPatient.setPatientStatus(patient.getPatientStatus());
        existingPatient.setRoomNo(patient.getRoomNo());
        existingPatient.setBedNo(patient.getBedNo());
        existingPatient.setFloor(patient.getFloor());
        existingPatient.setWard(patient.getWard());
        existingPatient.setPatientMobileNo(patient.getPatientMobileNo());
        existingPatient.setAttendantContact(patient.getAttendantContact());

        existingPatient.setCombo(patient.getCombo());
        existingPatient.setAllergies(patient.getAllergies());
        existingPatient.setDislikes(patient.getDislikes());

        return patientRepository.save(existingPatient);
    }

    @Override
    public void deletePatient(int id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + id));
        patientRepository.delete(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(int id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + id));
    }


    

    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

   

   

    @Override
    public List<String> getFloorsByWard(String ward) {
        return patientRepository.findByWard(ward)
                .stream()
                .map(Patient::getFloor)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getRoomsByFloor(String floor) {
        return patientRepository.findByFloor(floor)
                .stream()
                .map(Patient::getRoomNo)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getBedsByRoom(String roomNo) {
        return patientRepository.findByRoomNo(roomNo)
                .stream()
                .map(Patient::getBedNo)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public Patient getPatientByBedNo(String bedNo) {
        return patientRepository.findByBedNo(bedNo)
                .stream()
                .findFirst()
                .orElse(null);
    }
    @Override
public List<String> getAllFloors() {
    return patientRepository.findDistinctFloors();
}
@Override
public List<String> getWardsByFloor(String floor) {
    return patientRepository.findDistinctWardsByFloor(floor);
}

@Override
public List<String> getRoomsByFloorAndWard(String floor, String ward) {
    return patientRepository.findDistinctRoomsByFloorAndWard(floor, ward);
}

@Override
public List<String> getBedsByFloorWardAndRoom(String floor, String ward, String room) {
    return patientRepository.findDistinctBedsByFloorWardAndRoom(floor, ward, room);
}
@Override
public List<Patient> getPatientsByFloorWardRoomAndBed(String floor, String ward, String room, String bed) {
    return patientRepository.findPatientsByFloorWardRoomAndBed(floor, ward, room, bed);
}


}



