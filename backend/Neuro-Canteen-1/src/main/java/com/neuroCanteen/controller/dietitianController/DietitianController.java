package com.neuroCanteen.controller.dietitianController;

import com.neuroCanteen.model.dietitian.Dietitian;
import com.neuroCanteen.service.DietitianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/dietitian")
public class DietitianController {

    @Autowired
    private DietitianService dietitianService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createDietitian(@RequestBody Dietitian dietitian) {
        Map<String, Object> response = new HashMap<>();

        try {
            Dietitian createdDietitian = dietitianService.createDietitian(dietitian);

            response.put("status", "success");
            response.put("message", "Dietitian created successfully");
            response.put("data", createdDietitian);

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (DataIntegrityViolationException e) {
            response.put("status", "error");
            response.put("message", "Username already exists");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Internal server error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    public ResponseEntity<Map<String, Object>> updateDietitian(@PathVariable int id, @RequestBody Dietitian dietitian) {
        Map<String, Object> response = new HashMap<>();
    
        try {
            Dietitian updated = dietitianService.updateDietitian(id, dietitian);
    
            if (updated == null) {
                response.put("status", "error");
                response.put("message", "Dietitian not found with ID: " + id);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); 
            }
    
            response.put("status", "success");
            response.put("message", "Dietitian updated successfully");
            response.put("data", updated);
            return new ResponseEntity<>(response, HttpStatus.OK); 
    
        } catch (DataIntegrityViolationException e) {
            response.put("status", "error");
            response.put("message", "Username already exists");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT); 
    
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Internal server error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteDietitian(@PathVariable int id) {
        dietitianService.deleteDietitian(id);
    }
}
