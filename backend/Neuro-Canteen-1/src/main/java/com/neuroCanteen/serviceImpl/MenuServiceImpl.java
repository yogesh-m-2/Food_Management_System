package com.neuroCanteen.serviceImpl;

import com.neuroCanteen.model.menuitem.*;
import com.neuroCanteen.model.menuitem.Role;
import com.neuroCanteen.repository.MenuRepository;
import com.neuroCanteen.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                    menuItem.setCategory(updatedMenuItem.getCategory());
                    menuItem.setPrice(updatedMenuItem.getPrice());
                    menuItem.setRole(updatedMenuItem.getRole());
                    menuItem.setPicture(updatedMenuItem.getPicture());
                    menuItem.setDescription(updatedMenuItem.getDescription());
                    menuItem.setDietitianPrice(updatedMenuItem.getDietitianPrice());
                    menuItem.setPatientPrice(updatedMenuItem.getPatientPrice());
                    menuItem.setStaffPrice(updatedMenuItem.getStaffPrice());
                    menuItem.setAvailable(updatedMenuItem.isAvailable()); // Fix for availability update
                    menuItem.setCombination(updatedMenuItem.getCombination());
                    return menuRepository.save(menuItem);
                })
                .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
    }

    @Override
    public void deleteMenuItem(int id) {
        menuRepository.deleteById(id);
    }

    @Override
    public List<MenuItem> getMenuItemsByRole(Role role) {
        return menuRepository.findByRole(role);
    }
}
