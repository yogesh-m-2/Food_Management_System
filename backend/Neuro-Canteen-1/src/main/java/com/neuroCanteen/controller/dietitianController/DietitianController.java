package com.neuroCanteen.controller.dietitianController;

import com.neuroCanteen.model.dietitian.Dietitian;
import com.neuroCanteen.service.DietitianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dietitian")
public class DietitianController {

    @Autowired
    private DietitianService dietitianService;

    @PostMapping
    public Dietitian createDietitian(@RequestBody Dietitian dietitian) {
        return dietitianService.createDietitian(dietitian);
    }

    @GetMapping
    public List<Dietitian> getAllDietitians() {
        return dietitianService.getAllDietitians();
    }

    @GetMapping("/{id}")
    public Dietitian getDietitianById(@PathVariable int id) {
        return dietitianService.getDietitianById(id);
    }

    @PutMapping("/{id}")
    public Dietitian updateDietitian(@PathVariable int id, @RequestBody Dietitian dietitian) {
        return dietitianService.updateDietitian(id, dietitian);
    }

    @DeleteMapping("/{id}")
    public void deleteDietitian(@PathVariable int id) {
        dietitianService.deleteDietitian(id);
    }
}
