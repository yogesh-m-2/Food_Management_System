package com.neuroCanteen.controller.menuContoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.neuroCanteen.model.menuitem.MenuItem;
import com.neuroCanteen.service.MenuService;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Map;
import java.util.ArrayList;
import com.fasterxml.jackson.core.type.TypeReference;

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
                .toLowerCase(); // Normalize the key to lowercase
    
        ObjectMapper objectMapper = new ObjectMapper();
        List<MenuItem> result = new ArrayList<>();
    
        for (MenuItem item : allItems) {
            String timeSlotJson = item.getTimeSlot(); // JSON object like {"monday": ["morning", "dinner"]}
            try {
                if (timeSlotJson != null && !timeSlotJson.isBlank()) {
                    // Parse the timeSlotJson into a map
                    Map<String, List<String>> timeSlotMap = objectMapper.readValue(
                        timeSlotJson,
                        new TypeReference<Map<String, List<String>>>() {}
                    );
    
                    // Check if the current day exists in the timeSlot map
                    if (timeSlotMap.containsKey(currentDay)) {
                        List<String> timeSlotsForToday = timeSlotMap.get(currentDay);
    
                        // Format the timeSlots into a JSON string like '["Meals", "dinner"]'
                        String formattedTimeSlot = objectMapper.writeValueAsString(timeSlotsForToday);
    
                        // Set the formatted timeSlot back into the MenuItem object
                        item.setTimeSlot(formattedTimeSlot);  // Assuming MenuItem has a setter for timeSlot
    
                        // Add the item to the result list
                        result.add(item);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace(); // Use proper logging in production
            }
        }
    
        return result;
    }

    @GetMapping("/day/{day}")
public List<MenuItem> getMenuItemsForSpecificDay(@PathVariable String day) {
    List<MenuItem> allItems = menuService.getAllMenuItems();
    String currentDay = day.toLowerCase();  // Normalize the input day to lowercase (e.g., "thursday")

    ObjectMapper objectMapper = new ObjectMapper();
    List<MenuItem> result = new ArrayList<>();

    for (MenuItem item : allItems) {
        String timeSlotJson = item.getTimeSlot(); // JSON object like {"monday": ["morning", "dinner"]}
        try {
            if (timeSlotJson != null && !timeSlotJson.isBlank()) {
                // Parse the timeSlotJson into a map
                Map<String, List<String>> timeSlotMap = objectMapper.readValue(
                    timeSlotJson,
                    new TypeReference<Map<String, List<String>>>() {}
                );

                // Check if the provided day exists in the timeSlot map
                if (timeSlotMap.containsKey(currentDay)) {
                    List<String> timeSlotsForDay = timeSlotMap.get(currentDay);

                    // Format the timeSlots into a JSON string like '["Meals", "dinner"]'
                    String formattedTimeSlot = objectMapper.writeValueAsString(timeSlotsForDay);

                    // Set the formatted timeSlot back into the MenuItem object
                    item.setTimeSlot(formattedTimeSlot);  // Assuming MenuItem has a setter for timeSlot

                    // Add the item to the result list
                    result.add(item);
                }
            }
        } catch (Exception e) {
            e.printStackTrace(); // Use proper logging in production
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
