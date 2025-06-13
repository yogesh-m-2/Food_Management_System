package com.neuroCanteen.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuroCanteen.model.staff.Staff;
import com.neuroCanteen.repository.StaffRepository;
import com.neuroCanteen.service.StaffService;

import java.util.List;
import java.util.Optional;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Override
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @Override
    public Optional<Staff> getStaffById(int id) {
        return staffRepository.findById(id);
    }

    @Override
    public Optional<Staff> getStaffByEmployeeId(String employeeId) {
        return staffRepository.findByEmployeeId(employeeId);
    }

    @Override
    public Staff createStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    @Override
    public Staff updateStaff(int id, Staff updatedStaff) {
        return staffRepository.findById(id)
                .map(staff -> {
                    staff.setEmployeeId(updatedStaff.getEmployeeId());
                    staff.setName(updatedStaff.getName());
                    staff.setDepartment(updatedStaff.getDepartment());
                    staff.setRole(updatedStaff.getRole());
                    staff.setMobileNumber(updatedStaff.getMobileNumber());
                    staff.setPassword(updatedStaff.getPassword());
                    staff.setPaymentDetails(updatedStaff.getPaymentDetails());
                    return staffRepository.save(staff);
                })
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));
    }

    @Override
    public void deleteStaff(int id) {
        staffRepository.deleteById(id);
    }
}
