import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../../services/api"; // Import your api module
import '../../styles/staff/OrderCheckout.css'; // Import your CSS file
import '../../styles/patient/patientlogin.css'
import { jwtDecode } from "jwt-decode";

let username,token,decodedToken;
const PatientOrderCheckout = () => {
    const location = useLocation();
    const { cartItems, menuItems } = location.state;
    const navigate = useNavigate();
    const [tip, setTip] = useState(0); // State for handling tip
    const [address, setAddress] = useState(''); // State to hold delivery address
    const [submittedAddress, setSubmittedAddress] = useState(''); // State to store submitted address
    const [isEditing, setIsEditing] = useState(false); // State to toggle between edit/view mode
    const [uhid, setUhid] = useState('');
    const [showloginFrom, setshowloginFrom] = useState(false);
    const handlePatientLogin = async() => {
        try {
            const resjwt = await api.post("/authenticate/patient", { uhid });
            if (resjwt.data.jwt) {
              localStorage.setItem("jwtToken", resjwt.data.jwt);
                console.log("Working Login")
                setshowloginFrom(false)
                 token = localStorage.getItem("jwtToken");
                 decodedToken = jwtDecode(token);
                 username = decodedToken.sub;
                handleUPI()
            }
          } catch (error) {
            console.error("Login error:", error);
            alert("Failed to login. Please check your UHID.");
          }
    };

    // Handle address input change
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    // Handle address submission
    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setSubmittedAddress(address);
        setIsEditing(false); // Switch to view mode after submission
    };

    // Handle address edit
    const handleAddressEdit = () => {
        setAddress(submittedAddress); // Set the address to the submitted one for editing
        setIsEditing(true); // Switch to edit mode
    };

    // Calculate item total
    const calculateItemTotal = (item, quantity) => {
        return item.patientPrice * quantity;
    };

    // Calculate order total
    const calculateOrderTotal = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const item = menuItems.find(menuItem => menuItem.id === parseInt(itemId));
            total += calculateItemTotal(item, cartItems[itemId]);
        }
        return total;
    };

    const deliveryFee = 0; // Delivery fee (you can calculate this dynamically if needed)
    const platformFee = 0;
    const gstAndCharges = 0;
    const orderTotal = calculateOrderTotal();

    // Calculate the grand total
    const grandTotal = orderTotal + deliveryFee + platformFee + gstAndCharges + tip;
     token = localStorage.getItem("jwtToken");
     decodedToken = jwtDecode(token);
     username = decodedToken.sub;

    // Handle UPI payment with Razorpay
    const handleUPI = async () => {
        const payment_metadata = await api.post("/payment/createOrder", { price: grandTotal });
        const { orderId, amount } = payment_metadata.data;

        
            const options = {
                key: "rzp_test_0oZHIWIDL59TxD", // Replace with your Razorpay key
                amount: amount * 100, // Amount in paise (Razorpay expects the amount in paise)
                currency: "INR",
                name: "Neuro Canteen",
                description: "Payment for Order",
                order_id: orderId,
                handler: function(response) {
                    verifyPayment(response);
                },
                prefill: {
                    name: username,
                    email: "user@example.com",
                    contact: "1234567890",
                },
                notes: {
                    address: submittedAddress,
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        
    };

    const verifyPayment = async (response) => {
        const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            paymentSignature : response.razorpay_signature,
            paymentMethod: "UPI",
            amount: calculateOrderTotal(),
            createdAt: new Date().toISOString(),
        };
        console.log(response)
        const orderDetails = {
            orderedRole: "Patient", // Since it's a patient order
            orderedName: username, // Use the logged-in username
            orderedUserId: username, // Same as the username if no user id
            itemName: Object.keys(cartItems).map(itemId => {
                const item = menuItems.find(menuItem => menuItem.id === parseInt(itemId));
                return item.name+" - "+cartItems[itemId];
            }).join(", "), // Join item names into a single string
            quantity: Object.values(cartItems).reduce((acc, qty) => acc + qty, 0), // Total quantity
            category: "South", // You can dynamically set this if needed
            price: orderTotal, // Total price for the items
            orderStatus: null, // Can be updated once the order is processed
            paymentType: "UPI", // Payment type set to "Cash On Delivery"
            paymentStatus: null, // Initially null
            orderDateTime: new Date().toISOString(), // Current date and time
            address: submittedAddress, // Use the submitted address
            paymentRecived: false
        };

        try {
            const result = await api.post("/payment/verifyPayment", paymentData);
            console.log(result.data)
            if (result.data) {
                orderDetails.paymentRecived = true
                orderDetails.paymentStatus = "COMPLETED"
                const response = await api.post("/orders", orderDetails);
                navigate("/patient/order-success", { state: { orderHistoryRedirect: "/patient/orderhistory", orderedUserId: username, orderedRole: "Patient" } });
            } else {
                alert("Payment verification failed!");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            alert("There was an issue verifying your payment.");
        }
    };

    // Handle Cash On Delivery (COD) payment
    const handleCOD = async () => {
        const orderDetails = {
            orderedRole: "Patient", // Since it's a patient order
            orderedName: username, // Use the logged-in username
            orderedUserId: username, // Same as the username if no user id
            itemName: Object.keys(cartItems).map(itemId => {
                const item = menuItems.find(menuItem => menuItem.id === parseInt(itemId));
                return item.name+" - "+cartItems[itemId];
            }).join(", "), // Join item names into a single string
            quantity: Object.values(cartItems).reduce((acc, qty) => acc + qty, 0), // Total quantity
            category: "South", // You can dynamically set this if needed
            price: orderTotal, // Total price for the items
            orderStatus: null, // Can be updated once the order is processed
            paymentType: "COD", // Payment type set to "Cash On Delivery"
            paymentStatus: null, // Initially null
            orderDateTime: new Date().toISOString(), // Current date and time
            address: submittedAddress, // Use the submitted address
        };

        try {
            const response = await api.post("/orders", orderDetails);
            console.log("Order submitted successfully", response.data);
            navigate("/patient/order-success", { state: { orderHistoryRedirect: "/patient/orderhistory", orderedUserId: username, orderedRole: "Patient" } });
        } catch (error) {
            console.error("Order submission failed", error);
            alert("There was an issue submitting your order.");
        }
    };

    return (
        <div className="order-checkout-container">
            {showloginFrom && (
            <div className="patient-login-overlay">
                <div className="patient-login-box">
                <div className="patient-login-title">PATIENT LOGIN</div>
                <div className="patient-login-subtitle">Login</div>
                <label className="patient-login-label">UHID</label>
                <input
                    type="text"
                    value={uhid}
                    onChange={(e) => setUhid(e.target.value)}
                    placeholder="Enter UHID"
                    className="patient-login-input"
                />
                <button
                    className="patient-login-button"
                    onClick={handlePatientLogin} // Direct button click triggers login
                >
                Submit
                </button>
                </div>
            </div>
            )}
            <div className="order-details">
                <h2>Order Summary</h2>
                <div className="order-item-table">
                    <div className="table-header">
                        <span className="column-item">Item</span>
                        <span className="column-qty">Qty</span>
                        <span className="column-price">Total Price</span>
                    </div>
                    {Object.keys(cartItems).map(itemId => {
                        const item = menuItems.find(menuItem => menuItem.id === parseInt(itemId));
                        return (
                            <div key={itemId} className="table-row">
                                <span className="column-item">{item.name}</span>
                                <span className="column-qty">{cartItems[itemId]}</span>
                                <span className="column-price">
                                ₹{calculateItemTotal(item, cartItems[itemId])}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="delivery-details">
                <h2>Delivery Details</h2>
                {submittedAddress && !isEditing ? (
                    <div>
                        <p>{submittedAddress}</p>
                        <button onClick={handleAddressEdit} className="edit-address">Edit Address</button>
                    </div>
                ) : (
                    <form onSubmit={handleAddressSubmit}>
                        <textarea 
                            value={address} 
                            onChange={handleAddressChange} 
                            placeholder="Enter your delivery address" 
                            className="address-input"
                        />
                        <button type="submit" className="address-submit">Submit</button>
                    </form>
                )}
            </div>

            <div className="order-summary">
                <h2>Order Total:</h2>
                <div className="summary-item">
                    <span>Item Total</span>
                    <span>₹{orderTotal}</span>
                </div>
                <div className="summary-item">
                    <span>Delivery Fee (4.0 kms)</span>
                    <span>₹{deliveryFee}</span>
                </div>
                <div className="summary-item">
                    <span>Delivery Tip</span>
                    <input 
                        type="number" 
                        value={tip} 
                        onChange={(e) => setTip(Math.max(0,parseFloat(e.target.value) || 0))} 
                        placeholder="Enter tip" 
                        className="tip-input"
                    />
                </div>
                <div className="summary-item">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                </div>
                <div className="summary-item">
                    <span>GST and Restaurant Charges</span>
                    <span>₹{gstAndCharges}</span>
                </div>
                <div className="summary-item total">
                    <span>TO PAY</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                </div>

                <div className="payment-options">
                    <button onClick={handleCOD} className="cod">Cash On Delivery</button>
                    <button onClick={()=>{setshowloginFrom(true)}} className="upi">UPI</button>
                </div>
            </div>
        </div>
    );
};

export default PatientOrderCheckout;
