package com.neuroCanteen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.order.Order;
import com.neuroCanteen.model.order.Order.PaymentStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderedUserId(String orderedUserId);
    List<Order> findByOrderedRoleAndOrderedUserId(String orderedRole, String orderedUserId);
    Optional<Order> findByOrderId(Long orderId);
    List<Order> findByOrderStatus(Order.OrderStatus orderStatus);
    List<Order> findByOrderedRoleAndPaymentTypeAndPaymentStatus(
        String orderedRole,
        String paymentType,
        PaymentStatus paymentStatus
    );
    @Query("SELECT o FROM Order o WHERE o.PhoneNo = :PhoneNo AND o.orderedRole = :orderedRole")
    List<Order> findByPhoneNoAndOrderedRole(@Param("PhoneNo") String PhoneNo, @Param("orderedRole") String orderedRole);
}
