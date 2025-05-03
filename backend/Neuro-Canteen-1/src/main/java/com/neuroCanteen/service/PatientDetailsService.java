package com.neuroCanteen.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.neuroCanteen.model.patient.Patient;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import java.util.ArrayList;

@Service
public class PatientDetailsService implements UserDetailsService {

    @Autowired
    private EntityManager entityManager;

    @Override
    public UserDetails loadUserByUsername(String uhid) throws UsernameNotFoundException {
        String queryStr = "SELECT p FROM Patient p WHERE p.uhid = :uhid";
        TypedQuery<Patient> query = entityManager.createQuery(queryStr, Patient.class);
        query.setParameter("uhid", uhid);

        Patient patient;
        try {
            patient = query.getSingleResult();
        } catch (Exception e) {
            throw new UsernameNotFoundException("Patient not found with UHID: " + uhid);
        }

        return new User(patient.getUhid(), "", new ArrayList<>()); // No password required
    }
}
