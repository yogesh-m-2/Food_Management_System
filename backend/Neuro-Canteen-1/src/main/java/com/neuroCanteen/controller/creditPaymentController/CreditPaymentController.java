package com.neuroCanteen.controller.creditPaymentController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.neuroCanteen.model.creditpayment.CreditPayment;
import com.neuroCanteen.service.CreditPaymentService;

@RestController
@RequestMapping("/api/credit-payments")
public class CreditPaymentController {

    @Autowired
    private CreditPaymentService creditPaymentService;

    @PostMapping
    public ResponseEntity<CreditPayment> createCreditPayment(@RequestBody CreditPayment creditPayment) {
        return ResponseEntity.ok(creditPaymentService.saveCreditPayment(creditPayment));
    }

    @GetMapping
    public ResponseEntity<List<CreditPayment>> getAllCreditPayments() {
        return ResponseEntity.ok(creditPaymentService.getAllCreditPayments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditPayment> getCreditPaymentById(@PathVariable Long id) {
        Optional<CreditPayment> creditPayment = creditPaymentService.getCreditPaymentById(id);
        return creditPayment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CreditPayment>> getCreditPaymentsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(creditPaymentService.getCreditPaymentsByUserId(userId));
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<CreditPayment>> getCreditPaymentsByRole(@PathVariable String role) {
        return ResponseEntity.ok(creditPaymentService.getCreditPaymentsByRole(role));
    }

    @GetMapping("/payment-type/{paymentType}")
    public ResponseEntity<List<CreditPayment>> getCreditPaymentsByPaymentType(@PathVariable String paymentType) {
        return ResponseEntity.ok(creditPaymentService.getCreditPaymentsByPaymentType(paymentType));
    }

    @GetMapping("/paid/{isPaid}")
    public ResponseEntity<List<CreditPayment>> getCreditPaymentsByIsPaid(@PathVariable boolean isPaid) {
        return ResponseEntity.ok(creditPaymentService.getCreditPaymentsByIsPaid(isPaid));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CreditPayment> updateCreditPayment(@PathVariable Long id, @RequestBody CreditPayment creditPaymentDetails) {
        CreditPayment updatedCreditPayment = creditPaymentService.updateCreditPayment(id, creditPaymentDetails);
        return updatedCreditPayment != null ? ResponseEntity.ok(updatedCreditPayment) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCreditPayment(@PathVariable Long id) {
        creditPaymentService.deleteCreditPayment(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/mark-as-paid")
    public ResponseEntity<CreditPayment> markAsPaid(@PathVariable Long id) {
        CreditPayment updatedCreditPayment = creditPaymentService.markAsPaid(id);
        return updatedCreditPayment != null ? ResponseEntity.ok(updatedCreditPayment) : ResponseEntity.notFound().build();
    }
} 