package com.neuroCanteen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.patient.Patient;
@Repository
public interface PatientRepository  extends JpaRepository<Patient, Integer>{
    List<Patient> findByFloor(String floor);
    List<Patient> findByWard(String ward);
    List<Patient> findByRoomNo(String roomNo);
    List<Patient> findByBedNo(String bedNo);
    @Query("SELECT DISTINCT p.floor FROM Patient p")
    List<String> findDistinctFloors();
    @Query("SELECT DISTINCT p.ward FROM Patient p WHERE p.floor = :floor")
    List<String> findDistinctWardsByFloor(@Param("floor") String floor);
    @Query("SELECT DISTINCT p.roomNo FROM Patient p WHERE p.floor = :floor AND p.ward = :ward")
    List<String> findDistinctRoomsByFloorAndWard(@Param("floor") String floor, @Param("ward") String ward);
    @Query("SELECT DISTINCT p.bedNo FROM Patient p WHERE p.floor = :floor AND p.ward = :ward AND p.roomNo = :room")
    List<String> findDistinctBedsByFloorWardAndRoom(@Param("floor") String floor, @Param("ward") String ward, @Param("room") String room);
    @Query("SELECT p FROM Patient p WHERE p.floor = :floor AND p.ward = :ward AND p.roomNo = :room AND p.bedNo = :bed")
List<Patient> findPatientsByFloorWardRoomAndBed(
    @Param("floor") String floor, 
    @Param("ward") String ward, 
    @Param("room") String room, 
    @Param("bed") String bed);
}
