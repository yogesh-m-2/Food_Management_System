package com.neuroCanteen.controller.paymentController;

import com.neuroCanteen.model.payment.Payment;
import com.neuroCanteen.service.PaymentService;
import com.razorpay.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/createOrder")
    public Map<String, Object> createOrder(@RequestBody Map<String, Double> request) {
        try {
            // Creating an order for 1 INR
            double amount = request.get("price");
            Order order = paymentService.createOrder(amount);
            return Map.of("orderId", order.get("id"), "amount", amount);
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("error", "Failed to create order");
        }
    }

    @PostMapping("/verifyPayment")
    public Payment verifyPayment(@RequestBody Map<String, String> paymentData) {
        String orderId = paymentData.get("orderId");
        String paymentId = paymentData.get("paymentId");
        String paymentStatus = paymentData.get("paymentStatus");
        String paymentMethod = paymentData.get("paymentMethod");
        double amount = Double.parseDouble(paymentData.get("amount"));
        String createdAt = paymentData.get("createdAt");

        return paymentService.savePaymentData(orderId, paymentId, paymentStatus, paymentMethod, amount, createdAt);
    }
}
