package com.neuroCanteen.service;
import java.util.List;
import java.util.Optional;

import com.neuroCanteen.model.admin.Admin;
public interface AdminService {
    List<Admin> getAllAdmins();
    Optional<Admin> getAdminById(int id);
    Admin createAdmin(Admin admin);
    Admin updateAdmin(int id, Admin admin);
    void deleteAdmin(int id);
    
}
