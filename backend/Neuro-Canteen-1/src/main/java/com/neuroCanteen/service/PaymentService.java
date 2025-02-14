package com.neuroCanteen.service;

import com.neuroCanteen.model.payment.Payment;
import com.neuroCanteen.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Value("${razorpay.keyId}")
    private String razorpayKeyId;

    @Value("${razorpay.keySecret}")
    private String razorpayKeySecret;

    public Order createOrder(double amount) throws Exception {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        // Creating a JSONObject to pass Razorpay order parameters
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int) (amount * 100));  // Amount in paise (1 INR = 100 paise)
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture", 1);

        // Creating the order in Razorpay
        Order order = razorpayClient.orders.create(orderRequest);
        return order;
    }

    public Payment savePaymentData(String orderId, String paymentId, String paymentStatus, String paymentMethod, double amount, String createdAt) {
        Payment payment = new Payment();
        payment.setOrderId(orderId);
        payment.setPaymentId(paymentId);
        payment.setPaymentStatus(paymentStatus);
        payment.setPaymentMethod(paymentMethod);
        payment.setAmount(amount);
        payment.setCreatedAt(createdAt);

        return paymentRepository.save(payment);
    }
}
