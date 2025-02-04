package com.neuroCanteen.service;

import com.neuroCanteen.model.menuitem.MenuItem;
import com.neuroCanteen.model.menuitem.Role;

import java.util.List;
import java.util.Optional;

public interface MenuService {
    List<MenuItem> getAllMenuItems();
    Optional<MenuItem> getMenuItemById(int id);
    List<MenuItem> getMenuItemsByRole(Role role); // New method to fetch menu items by role
    MenuItem createMenuItem(MenuItem menuItem);
    MenuItem updateMenuItem(int id, MenuItem menuItem);
    void deleteMenuItem(int id);
}
