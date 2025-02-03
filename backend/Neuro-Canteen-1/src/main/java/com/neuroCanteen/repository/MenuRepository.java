package com.neuroCanteen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.menuitem.MenuItem;

@Repository
public interface MenuRepository extends JpaRepository<MenuItem, Integer> {
}
