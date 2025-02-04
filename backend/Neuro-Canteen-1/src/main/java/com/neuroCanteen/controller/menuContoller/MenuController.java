package com.neuroCanteen.controller.menuContoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.neuroCanteen.model.menuitem.MenuItem;
import com.neuroCanteen.service.MenuService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/menu-items")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return menuService.getAllMenuItems();
    }

    @GetMapping("/{id}")
    public Optional<MenuItem> getMenuItemById(@PathVariable int id) {
        return menuService.getMenuItemById(id);
    }

    @PostMapping
    public MenuItem createMenuItem(@RequestBody MenuItem menuItem) {
        return menuService.createMenuItem(menuItem);
    }

    @PutMapping("/{id}")
    public MenuItem updateMenuItem(@PathVariable int id, @RequestBody MenuItem updatedMenuItem) {
        return menuService.updateMenuItem(id, updatedMenuItem);
    }

    @DeleteMapping("/{id}")
    public String deleteMenuItem(@PathVariable int id) {
        menuService.deleteMenuItem(id);
        return "Menu Item deleted with ID: " + id;
    }
}
