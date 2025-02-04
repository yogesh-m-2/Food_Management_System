package com.neuroCanteen.controller.deliveryUserController;

import com.neuroCanteen.model.deliveryUser.DeliverUser;
import com.neuroCanteen.service.DeliverUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delivery-user")
public class DeliverUserController {

    @Autowired
    private DeliverUserService deliverUserService;

    @PostMapping
    public DeliverUser createDeliverUser(@RequestBody DeliverUser deliverUser) {
        return deliverUserService.createDeliverUser(deliverUser);
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
    public DeliverUser updateDeliverUser(@PathVariable int id, @RequestBody DeliverUser deliverUser) {
        return deliverUserService.updateDeliverUser(id, deliverUser);
    }

    @DeleteMapping("/{id}")
    public void deleteDeliverUser(@PathVariable int id) {
        deliverUserService.deleteDeliverUser(id);
    }
}
