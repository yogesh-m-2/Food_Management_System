package com.neuroCanteen.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.neuroCanteen.model.deliveryUser.DeliverUser;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Service
public class DeliveryUserDetailsService implements UserDetailsService {
     @Autowired
    EntityManager entityManager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String queryStr = "SELECT d FROM DeliverUser d WHERE d.username = :username";
        TypedQuery<DeliverUser> query = entityManager.createQuery(queryStr, DeliverUser.class);
        query.setParameter("username", username);
        DeliverUser deliverUser = null;
        try {
            deliverUser = query.getSingleResult(); // Get the result from the query
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(deliverUser.getUsername(), deliverUser.getPassword(), new ArrayList<>());

   
    }
}
