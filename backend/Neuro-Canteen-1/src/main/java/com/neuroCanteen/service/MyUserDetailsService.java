package com.neuroCanteen.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.neuroCanteen.model.admin.Admin;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    EntityManager entityManager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String queryStr = "SELECT a FROM Admin a WHERE a.username = :username";
        TypedQuery<Admin> query = entityManager.createQuery(queryStr, Admin.class);
        query.setParameter("username", username);
        Admin admin = null;
        try {
            admin = query.getSingleResult(); // Get the result from the query
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(admin.getUsername(), admin.getPassword(), new ArrayList<>());

    //    return new User("foo","foo", new ArrayList<>());
    }
}