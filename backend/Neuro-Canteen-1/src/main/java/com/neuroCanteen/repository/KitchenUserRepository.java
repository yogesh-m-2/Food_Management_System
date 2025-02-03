package com.neuroCanteen.repository;

import com.neuroCanteen.model.kitchenUserControl.KitchenUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KitchenUserRepository extends JpaRepository<KitchenUser, Integer> {
}