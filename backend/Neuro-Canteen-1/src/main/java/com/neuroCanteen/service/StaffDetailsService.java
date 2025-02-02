package com.neuroCanteen.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.neuroCanteen.model.staff.Staff;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Service
public class StaffDetailsService implements UserDetailsService {
    @Autowired
    EntityManager entityManager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String queryStr = "select s from Staff s WHERE s.employeeId = :username";
        TypedQuery<Staff> query = entityManager.createQuery(queryStr, Staff.class);
        query.setParameter("username", username);
        Staff staff = null;
        try {
            staff = query.getSingleResult(); // Get the result from the query
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(staff.getEmployeeId(), staff.getPassword(), new ArrayList<>());

   
    }
}
