package com.neuroCanteen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.creditpayment.CreditPayment;

@Repository
public interface CreditPaymentRepository extends JpaRepository<CreditPayment, Long> {
    List<CreditPayment> findByUserId(String userId);
    List<CreditPayment> findByRole(String role);
    List<CreditPayment> findByPaymentType(String paymentType);
    List<CreditPayment> findByPaid(boolean paid);
} 