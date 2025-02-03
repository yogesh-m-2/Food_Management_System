package com.neuroCanteen.service;

import com.neuroCanteen.model.staff.Staff;

import java.util.List;
import java.util.Optional;

public interface StaffService {
    List<Staff> getAllStaff();
    Optional<Staff> getStaffById(int id);
    Staff createStaff(Staff staff);
    Staff updateStaff(int id, Staff staff);
    void deleteStaff(int id);
}
