package com.neuroCanteen.service;

import java.util.List;
import java.util.Optional;

import com.neuroCanteen.model.creditpayment.CreditPayment;

public interface CreditPaymentService {
    CreditPayment saveCreditPayment(CreditPayment creditPayment);
    List<CreditPayment> getAllCreditPayments();
    Optional<CreditPayment> getCreditPaymentById(Long id);
    List<CreditPayment> getCreditPaymentsByUserId(String userId);
    List<CreditPayment> getCreditPaymentsByRole(String role);
    List<CreditPayment> getCreditPaymentsByPaymentType(String paymentType);
    List<CreditPayment> getCreditPaymentsByIsPaid(boolean isPaid);
    CreditPayment updateCreditPayment(Long id, CreditPayment creditPaymentDetails);
    void deleteCreditPayment(Long id);
    CreditPayment markAsPaid(Long id);
} 