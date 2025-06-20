package com.neuroCanteen.controller.deliveryUserController;

import com.neuroCanteen.model.deliveryUser.DeliverUser;
import com.neuroCanteen.service.DeliverUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/delivery-user")
public class DeliverUserController {

    @Autowired
    private DeliverUserService deliverUserService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createDeliverUser(@RequestBody DeliverUser deliverUser) {
        Map<String, Object> response = new HashMap<>();

        try {
            DeliverUser createdUser = deliverUserService.createDeliverUser(deliverUser);

            response.put("status", "success");
            response.put("message", "Delivery user created successfully");
            response.put("data", createdUser);

            return new ResponseEntity<>(response, HttpStatus.CREATED); // 201

        } catch (DataIntegrityViolationException e) {
            response.put("status", "error");
            response.put("message", "Username already exists");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT); // 409

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Internal server error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR); // 500
        }
    }

    @GetMapping
    public List<DeliverUser> getAllDeliverUsers() {
        return deliverUserService.getAllDeliverUsers();
    }

    @GetMapping("/{id}")
    public DeliverUser getDeliverUserById(@PathVariable int id) {
        return deliverUserService.getDeliverUserById(id);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateDeliverUser(@PathVariable int id, @RequestBody DeliverUser deliverUser) {
        Map<String, Object> response = new HashMap<>();
    
        try {
            DeliverUser updated = deliverUserService.updateDeliverUser(id, deliverUser);
    
            if (updated == null) {
                response.put("status", "error");
                response.put("message", "Deliver user not found with ID: " + id);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
    
            response.put("status", "success");
            response.put("message", "Deliver user updated successfully");
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
    public void deleteDeliverUser(@PathVariable int id) {
        deliverUserService.deleteDeliverUser(id);
    }
}
