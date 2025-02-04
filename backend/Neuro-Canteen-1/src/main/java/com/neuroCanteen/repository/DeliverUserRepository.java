package com.neuroCanteen.repository;

import com.neuroCanteen.model.deliveryUser.DeliverUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliverUserRepository extends JpaRepository<DeliverUser, Integer> {
}
