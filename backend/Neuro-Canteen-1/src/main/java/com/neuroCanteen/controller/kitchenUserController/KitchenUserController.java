package com.neuroCanteen.controller.kitchenUserController;
import com.neuroCanteen.model.kitchenUserControl.KitchenUser;
import com.neuroCanteen.service.KitchenUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/kitchen-users")
public class KitchenUserController {

    @Autowired
    private KitchenUserService kitchenUserService;

    @PostMapping
    public KitchenUser createKitchenUser(@RequestBody KitchenUser kitchenUser) {
        return kitchenUserService.createKitchenUser(kitchenUser);
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
    public KitchenUser updateKitchenUser(@PathVariable int id, @RequestBody KitchenUser kitchenUser) {
        return kitchenUserService.updateKitchenUser(id, kitchenUser);
    }

    @DeleteMapping("/{id}")
    public void deleteKitchenUser(@PathVariable int id) {
        kitchenUserService.deleteKitchenUser(id);
    }
}