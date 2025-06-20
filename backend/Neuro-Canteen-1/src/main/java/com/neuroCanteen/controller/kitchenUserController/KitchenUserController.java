package com.neuroCanteen.controller.kitchenUserController;
import com.neuroCanteen.model.kitchenUserControl.KitchenUser;
import com.neuroCanteen.service.KitchenUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/kitchen-users")
public class KitchenUserController {

    @Autowired
    private KitchenUserService kitchenUserService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createKitchenUser(@RequestBody KitchenUser kitchenUser) {
        Map<String, Object> response = new HashMap<>();

        try {
            KitchenUser createdUser = kitchenUserService.createKitchenUser(kitchenUser);

            response.put("status", "success");
            response.put("message", "Kitchen user created successfully");
            response.put("data", createdUser);

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
    public List<KitchenUser> getAllKitchenUsers() {
        return kitchenUserService.getAllKitchenUsers();
    }

    @GetMapping("/{id}")
    public KitchenUser getKitchenUserById(@PathVariable int id) {
        return kitchenUserService.getKitchenUserById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateKitchenUser(@PathVariable int id, @RequestBody KitchenUser kitchenUser) {
        Map<String, Object> response = new HashMap<>();
    
        try {
            KitchenUser updated = kitchenUserService.updateKitchenUser(id, kitchenUser);
    
            if (updated == null) {
                response.put("status", "error");
                response.put("message", "Kitchen user not found with ID: " + id);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
    
            response.put("status", "success");
            response.put("message", "Kitchen user updated successfully");
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
    public void deleteKitchenUser(@PathVariable int id) {
        kitchenUserService.deleteKitchenUser(id);
    }
}