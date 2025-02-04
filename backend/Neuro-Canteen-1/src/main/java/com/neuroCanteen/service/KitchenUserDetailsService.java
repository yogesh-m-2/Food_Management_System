package com.neuroCanteen.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.neuroCanteen.model.kitchenUserControl.KitchenUser;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Service
public class KitchenUserDetailsService implements UserDetailsService {

    @Autowired
    private EntityManager entityManager;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        String queryStr = "SELECT k FROM KitchenUser k WHERE k.userId = :userId";
        TypedQuery<KitchenUser> query = entityManager.createQuery(queryStr, KitchenUser.class);
        query.setParameter("userId", userId);
        
        KitchenUser kitchenUser;
        try {
            kitchenUser = query.getSingleResult();
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found with userId: " + userId);
        }

        return new User(kitchenUser.getUserId(), kitchenUser.getPassword(), new ArrayList<>());
    }
}
