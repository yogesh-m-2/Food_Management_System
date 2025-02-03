package com.neuroCanteen.controller.staffController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.neuroCanteen.model.staff.Staff;
import com.neuroCanteen.service.StaffService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @GetMapping("/{id}")
    public Optional<Staff> getStaffById(@PathVariable int id) {
        return staffService.getStaffById(id);
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
