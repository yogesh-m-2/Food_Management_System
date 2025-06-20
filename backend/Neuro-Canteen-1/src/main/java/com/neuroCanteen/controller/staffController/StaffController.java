package com.neuroCanteen.controller.staffController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

import com.neuroCanteen.model.staff.Staff;
import com.neuroCanteen.service.StaffService;
import com.neuroCanteen.dto.StaffDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @GetMapping
    public List<StaffDTO> getAllStaff() {
        return staffService.getAllStaff().stream()
                .map(StaffDTO::fromStaff)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<StaffDTO> getStaffById(@PathVariable int id) {
        return staffService.getStaffById(id)
                .map(StaffDTO::fromStaff);
    }

    @GetMapping("/employee/{employeeId}")
    public Optional<StaffDTO> getStaffByEmployeeId(@PathVariable String employeeId) {
        return staffService.getStaffByEmployeeId(employeeId)
                .map(StaffDTO::fromStaff);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createStaff(@RequestBody Staff staff) {
        Map<String, Object> response = new HashMap<>();
        try {
            Staff createdStaff = staffService.createStaff(staff);
            response.put("status", "success");
            response.put("message", "Staff created successfully");
            response.put("data", createdStaff);
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


    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateStaff(@PathVariable int id, @RequestBody Staff updatedStaff) {
        Map<String, Object> response = new HashMap<>();
    
        try {
            Staff updated = staffService.updateStaff(id, updatedStaff);
    
            if (updated == null) {
                response.put("status", "error");
                response.put("message", "Staff not found with ID: " + id);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); 
            }
    
            response.put("status", "success");
            response.put("message", "Staff updated successfully");
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

    @DeleteMapping("/{id}")
    public String deleteStaff(@PathVariable int id) {
        staffService.deleteStaff(id);
        return "Staff deleted with ID: " + id;
    }
}
