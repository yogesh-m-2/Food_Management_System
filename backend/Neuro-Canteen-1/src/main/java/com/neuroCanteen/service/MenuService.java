package com.neuroCanteen.service;

import com.neuroCanteen.model.menuitem.MenuItem;

import java.util.List;
import java.util.Optional;

public interface MenuService {
    List<MenuItem> getAllMenuItems();
    Optional<MenuItem> getMenuItemById(int id);
    MenuItem createMenuItem(MenuItem menuItem);
    MenuItem updateMenuItem(int id, MenuItem menuItem);
    void deleteMenuItem(int id);
}
