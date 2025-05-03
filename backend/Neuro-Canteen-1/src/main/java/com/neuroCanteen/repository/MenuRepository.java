package com.neuroCanteen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.menuitem.MenuItem;
import com.neuroCanteen.model.menuitem.Role;

@Repository
public interface MenuRepository extends JpaRepository<MenuItem, Integer> {

    List<MenuItem> findByRole(Role role);
   // List<MenuItem> findByRole(Role role); // Fetch menu items by role
    //List<MenuItem> findByRole(com.neuroCanteen.serviceImpl.Role role);
}
