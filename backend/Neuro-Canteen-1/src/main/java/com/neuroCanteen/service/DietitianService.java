package com.neuroCanteen.service;

import com.neuroCanteen.model.dietitian.Dietitian;

import java.util.List;

public interface DietitianService {
    Dietitian createDietitian(Dietitian dietitian);
    Dietitian getDietitianById(int id);
    List<Dietitian> getAllDietitians();
    Dietitian updateDietitian(int id, Dietitian dietitian);
    void deleteDietitian(int id);
}
