package com.neuroCanteen.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.neuroCanteen.model.dietitian.Dietitian;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Service
public class DietitianDetailsService implements UserDetailsService {
    @Autowired
    EntityManager entityManager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String queryStr = "select d from Dietitian d WHERE d.username = :username";
        TypedQuery<Dietitian> query = entityManager.createQuery(queryStr, Dietitian.class);
        query.setParameter("username", username);
        Dietitian dietitian = null;
        try {
            dietitian = query.getSingleResult(); // Get the result from the query
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(dietitian.getUsername(), dietitian.getPassword(), new ArrayList<>());

   
    }
}
