package com.neuroCanteen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.neuroCanteen.model.order.Order;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderedUserId(String orderedUserId);
    List<Order> findByOrderedRoleAndOrderedUserId(String orderedRole, String orderedUserId);
}
