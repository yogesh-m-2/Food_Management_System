package com.neuroCanteen.controller.menuContoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.neuroCanteen.model.menuitem.MenuItem;
import com.neuroCanteen.service.MenuService;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/menu-items")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return menuService.getAllMenuItems();
    }

    @GetMapping("/day")
    public List<MenuItem> getMenuItemsForToday() {
        List<MenuItem> allItems = menuService.getAllMenuItems();
        String currentDay = LocalDate.now()
                .getDayOfWeek()
                .getDisplayName(TextStyle.FULL, Locale.ENGLISH)
                .toLowerCase(); // e.g., "monday"
    
        List<MenuItem> result = new ArrayList<>();
    
        for (MenuItem item : allItems) {
            Map<String, List<String>> timeSlotMap = item.getTimeSlot();
    
            if (timeSlotMap != null && timeSlotMap.containsKey(currentDay)) {
                // Optional: You can filter/format the time slot for current day here if needed
                result.add(item);
            }
        }
    
        return result;
    }
    

    @GetMapping("/day/{day}")
    public List<MenuItem> getMenuItemsForSpecificDay(@PathVariable String day) {
        List<MenuItem> allItems = menuService.getAllMenuItems();
        String currentDay = day.toLowerCase();  // Normalize the input (e.g., "Thursday" → "thursday")

        List<MenuItem> result = new ArrayList<>();

        for (MenuItem item : allItems) {
            Map<String, List<String>> timeSlotMap = item.getTimeSlot();

            if (timeSlotMap != null && timeSlotMap.containsKey(currentDay)) {
                result.add(item);
            }
        }

        return result;
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
