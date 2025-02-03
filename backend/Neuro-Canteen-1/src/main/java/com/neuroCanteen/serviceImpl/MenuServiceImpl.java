package com.neuroCanteen.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuroCanteen.model.menuitem.MenuItem;
import com.neuroCanteen.repository.MenuRepository;
import com.neuroCanteen.service.MenuService;

import java.util.List;
import java.util.Optional;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Override
    public List<MenuItem> getAllMenuItems() {
        return menuRepository.findAll();
    }

    @Override
    public Optional<MenuItem> getMenuItemById(int id) {
        return menuRepository.findById(id);
    }

    @Override
    public MenuItem createMenuItem(MenuItem menuItem) {
        return menuRepository.save(menuItem);
    }

    @Override
    public MenuItem updateMenuItem(int id, MenuItem updatedMenuItem) {
        return menuRepository.findById(id)
                .map(menuItem -> {
                    menuItem.setName(updatedMenuItem.getName());
                    menuItem.setPicture(updatedMenuItem.getPicture());
                    menuItem.setPrice(updatedMenuItem.getPrice());
                    menuItem.setCategory(updatedMenuItem.getCategory());
                    return menuRepository.save(menuItem);
                })
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
    }

    @Override
    public void deleteMenuItem(int id) {
        menuRepository.deleteById(id);
    }
}
