package com.neuroCanteen.serviceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuroCanteen.model.admin.Admin;
import com.neuroCanteen.respository.AdminRepository;
import com.neuroCanteen.service.AdminService;

import java.util.List;
import java.util.Optional;
@Service
public class AdminServiceImpl implements AdminService {

@Autowired
    private AdminRepository adminRepository;

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Optional<Admin> getAdminById(int id) {
        return adminRepository.findById(id);
    }

    @Override
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin updateAdmin(int id, Admin updatedAdmin) {
        return adminRepository.findById(id)
                .map(admin -> {
                    admin.setName(updatedAdmin.getName());
                    admin.setUsername(updatedAdmin.getUsername());
                    admin.setPassword(updatedAdmin.getPassword());
                    return adminRepository.save(admin);
                }).orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));
    }

    @Override
    public void deleteAdmin(int id) {
        adminRepository.deleteById(id);
    }


    
}
