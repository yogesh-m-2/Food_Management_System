package com.neuroCanteen.controller.staffController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Staff createStaff(@RequestBody Staff staff) {
        return staffService.createStaff(staff);
    }

    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable int id, @RequestBody Staff updatedStaff) {
        return staffService.updateStaff(id, updatedStaff);
    }

    @DeleteMapping("/{id}")
    public String deleteStaff(@PathVariable int id) {
        staffService.deleteStaff(id);
        return "Staff deleted with ID: " + id;
    }
}
