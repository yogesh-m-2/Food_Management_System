package com.neuroCanteen.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuroCanteen.model.creditpayment.CreditPayment;
import com.neuroCanteen.repository.CreditPaymentRepository;
import com.neuroCanteen.service.CreditPaymentService;

@Service
public class CreditPaymentServiceImpl implements CreditPaymentService {

    @Autowired
    private CreditPaymentRepository creditPaymentRepository;

    @Override
    public CreditPayment saveCreditPayment(CreditPayment creditPayment) {
        return creditPaymentRepository.save(creditPayment);
    }

    @Override
    public List<CreditPayment> getAllCreditPayments() {
        return creditPaymentRepository.findAll();
    }

    @Override
    public Optional<CreditPayment> getCreditPaymentById(Long id) {
        return creditPaymentRepository.findById(id);
    }

    @Override
    public List<CreditPayment> getCreditPaymentsByUserId(String userId) {
        return creditPaymentRepository.findByUserId(userId);
    }

    @Override
    public List<CreditPayment> getCreditPaymentsByRole(String role) {
        return creditPaymentRepository.findByRole(role);
    }

    @Override
    public List<CreditPayment> getCreditPaymentsByPaymentType(String paymentType) {
        return creditPaymentRepository.findByPaymentType(paymentType);
    }

    @Override
    public List<CreditPayment> getCreditPaymentsByIsPaid(boolean isPaid) {
        return creditPaymentRepository.findByPaid(isPaid);
    }

    @Override
    public CreditPayment updateCreditPayment(Long id, CreditPayment creditPaymentDetails) {
        Optional<CreditPayment> creditPayment = creditPaymentRepository.findById(id);
        if (creditPayment.isPresent()) {
            CreditPayment existingCreditPayment = creditPayment.get();
            existingCreditPayment.setUserId(creditPaymentDetails.getUserId());
            existingCreditPayment.setRole(creditPaymentDetails.getRole());
            existingCreditPayment.setAmount(creditPaymentDetails.getAmount());
            existingCreditPayment.setOrders(creditPaymentDetails.getOrders());
            existingCreditPayment.setPaymentType(creditPaymentDetails.getPaymentType());
            existingCreditPayment.setPaid(creditPaymentDetails.isPaid());
            return creditPaymentRepository.save(existingCreditPayment);
        }
        return null;
    }

    @Override
    public void deleteCreditPayment(Long id) {
        creditPaymentRepository.deleteById(id);
    }

    @Override
    public CreditPayment markAsPaid(Long id) {
        Optional<CreditPayment> creditPayment = creditPaymentRepository.findById(id);
        if (creditPayment.isPresent()) {
            CreditPayment existingCreditPayment = creditPayment.get();
            existingCreditPayment.setPaid(true);
            return creditPaymentRepository.save(existingCreditPayment);
        }
        return null;
    }
} 