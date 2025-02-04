package com.neuroCanteen.serviceImpl;

import com.neuroCanteen.exceptions.ResourceNotFoundException;
import com.neuroCanteen.model.dietitian.Dietitian;
import com.neuroCanteen.repository.DietitianRepository;
import com.neuroCanteen.service.DietitianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DietitianServiceImpl implements DietitianService {

    @Autowired
    private DietitianRepository dietitianRepository;

    @Override
    public Dietitian createDietitian(Dietitian dietitian) {
        return dietitianRepository.save(dietitian);
    }

    @Override
    public Dietitian getDietitianById(int id) {
        return dietitianRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dietitian not found with ID: " + id));
    }

    @Override
    public List<Dietitian> getAllDietitians() {
        return dietitianRepository.findAll();
    }

    @Override
    public Dietitian updateDietitian(int id, Dietitian dietitian) {
        Dietitian existingDietitian = getDietitianById(id);
        existingDietitian.setName(dietitian.getName());
        existingDietitian.setUsername(dietitian.getUsername());
        existingDietitian.setPassword(dietitian.getPassword());
        existingDietitian.setSpecialization(dietitian.getSpecialization());
        return dietitianRepository.save(existingDietitian);
    }

    @Override
    public void deleteDietitian(int id) {
        Dietitian dietitian = getDietitianById(id);
        dietitianRepository.delete(dietitian);
    }
}
