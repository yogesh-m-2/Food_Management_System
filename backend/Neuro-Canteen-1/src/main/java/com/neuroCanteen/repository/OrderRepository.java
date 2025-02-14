package com.neuroCanteen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.order.Order;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderedUserId(String orderedUserId);
    List<Order> findByOrderedRoleAndOrderedUserId(String orderedRole, String orderedUserId);
    Optional<Order> findByOrderId(Long orderId);
    List<Order> findByOrderStatus(Order.OrderStatus orderStatus);
}
