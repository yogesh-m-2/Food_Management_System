package com.neuroCanteen.service;

import java.util.List;

import com.neuroCanteen.model.patient.Patient;

public interface PatientService {
    Patient createPatient(Patient patient);
    Patient updatePatient(int id, Patient patient);
    void deletePatient(int id);
    List<Patient> getAllPatients();
    Patient getPatientById(int id);
    Patient savePatient(Patient patient);
    List<String> getFloorsByWard(String ward);
    List<String> getRoomsByFloor(String floor);
    List<String> getBedsByRoom(String roomNo);
    Patient getPatientByBedNo(String bedNo);
    List<String> getAllFloors();
    List<String> getWardsByFloor(String floor);
    List<String> getRoomsByFloorAndWard(String floor, String ward);
    List<String> getBedsByFloorWardAndRoom(String floor, String ward, String room);
    List<Patient> getPatientsByFloorWardRoomAndBed(String floor, String ward, String room, String bed);


    
}
