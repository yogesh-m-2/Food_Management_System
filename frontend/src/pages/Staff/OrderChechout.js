import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../../services/api"; // Import your api module
import '../../styles/staff/OrderCheckout.css'; // Import your CSS file
import { jwtDecode } from "jwt-decode";

const OrderCheckout = () => {
    const location = useLocation();
    const { cartItems, menuItems } = location.state;
    const navigate = useNavigate();
    const [tip, setTip] = useState(0); // State for handling tip
    const [address, setAddress] = useState(''); // State to hold delivery address
    const [submittedAddress, setSubmittedAddress] = useState(''); // State to store submitted address
    const [isEditing, setIsEditing] = useState(false); // State to toggle between edit/view mode
    const [staffData, setStaffData] = useState(null);

    console.log(cartItems)
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    // useEffect(() => {
    //     const fetchStaffDetails = async () => {
    //         try {
    //             const token = localStorage.getItem("jwtToken");
    //             const decodedToken = jwtDecode(token);
    //             const employeeId = decodedToken.sub; // or decodedToken.employeeId if your JWT has that key

    //             const response = await api.get(`/staff/employee/${employeeId}`);
    //             console.log(response.data)
    //             setStaffData(response.data);
    //             console.log("Fetched staff data:", response.data);
    //         } catch (error) {
    //             console.error("Failed to fetch staff data:", error);
    //         }
    //     };

    //     fetchStaffDetails();
    // }, []);

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setSubmittedAddress(address);
        setIsEditing(false); // Switch to view mode after submission
    };

    const handleAddressEdit = () => {
        setAddress(submittedAddress); // Set the address to the submitted one for editing
        setIsEditing(true); // Switch to edit mode
    };

    const calculateItemTotal = (item, quantity) => {
        return item.staffPrice * quantity;
        
    };

    const calculateOrderTotal = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const item = menuItems.find(menuItem => menuItem.id === parseInt(itemId));
            total += calculateItemTotal(item, cartItems[itemId]);
        }
        return total;
    };

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
        const orderDetails = {
            orderedRole: "Staff",
            orderedName: username,
            orderedUserId: username,
            itemName: Object.keys(cartItems).map(itemId => {
                const item = menuItems.find(menuItem => menuItem.id === parseInt(itemId));
                return item.name+" X "+cartItems[itemId];
            }).join(", "),
            quantity: Object.values(cartItems).reduce((acc, qty) => acc + qty, 0),
            category: "South",
            price: orderTotal,
            orderStatus: null,
            paymentType: "UPI",
            paymentStatus: null,
            orderDateTime: new Date().toISOString(),
            address: submittedAddress,
            paymentRecived: false,
            // phoneNo : staffData.mobileNumber
        };

        try {
            const result = await api.post("/payment/verifyPayment", paymentData);
            if (result.data) {
                orderDetails.paymentRecived = true
                orderDetails.paymentStatus = "COMPLETED"
                const response = await api.post("/orders", orderDetails);
                navigate("/staff/order-success", { state: { orderHistoryRedirect: "/staff/orderhistory", orderedUserId: username, orderedRole: "Staff" } });
            } else {
                alert("Payment verification failed!");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            alert("There was an issue verifying your payment.");
        }
    };

    const deliveryFee = 0; // You can calculate this dynamically if needed
    const platformFee = 0;
    const gstAndCharges = 0;
    const orderTotal = calculateOrderTotal();

    const grandTotal = orderTotal + deliveryFee + platformFee + gstAndCharges + tip;
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const username = decodedToken.sub;

    const handleCOD = async () => {
        const orderDetails = {
            orderedRole: "Staff",
            orderedName: username,
            orderedUserId: username,
            itemName: Object.keys(cartItems).map(itemId => {
                const item = menuItems.find(menuItem => menuItem.id === parseInt(itemId));
                return item.name+" X "+cartItems[itemId];
            }).join(", "),
            quantity: Object.values(cartItems).reduce((acc, qty) => acc + qty, 0),
            category: "South",
            price: orderTotal,
            orderStatus: null,
            paymentType: "COD",
            paymentStatus: null,
            orderDateTime: new Date().toISOString(),
            address: submittedAddress,
            // phoneNo : staffData.mobileNumber
        };

        try {
            const response = await api.post("/orders", orderDetails);
            console.log("Order submitted successfully", response.data);
            navigate("/staff/order-success", { state: { orderHistoryRedirect: "/staff/orderhistory", orderedUserId: username, orderedRole: "Staff" } });
        } catch (error) {
            console.error("Order submission failed", error);
            alert("There was an issue submitting your order.");
        }
    };
    const handleorderhistory = () => {
        navigate("/staff/orderhistory",{
            "state": {
                "orderedUserId": "admin",
                "orderedRole": "Staff"
            }
        });

    }
    const handlecredit = async () => {
        const orderDetails = {
            orderedRole: "Staff",
            orderedName: username,
            orderedUserId: username,
            itemName: Object.keys(cartItems).map(itemId => {
                const item = menuItems.find(menuItem => menuItem.id === parseInt(itemId));
                return item.name+" X "+cartItems[itemId];
            }).join(", "),
            quantity: Object.values(cartItems).reduce((acc, qty) => acc + qty, 0),
            category: "South",
            price: orderTotal,
            orderStatus: null,
            paymentType: "CREDIT",
            paymentStatus: null,
            orderDateTime: new Date().toISOString(),
            address: submittedAddress,
            // phoneNo : staffData.mobileNumber

        };

        try {
            const response = await api.post("/orders", orderDetails);
            console.log("Order submitted successfully", response.data);
            navigate("/staff/order-success", { state: { orderHistoryRedirect: "/staff/orderhistory", orderedUserId: username, orderedRole: "Staff" } });
        } catch (error) {
            console.error("Order submission failed", error);
            alert("There was an issue submitting your order.");
        }
    };

    return (
        <div className="order-checkout-container">
            <div className="order-details">
                <h2>Order Summary</h2>
                {/* Order item table */}
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
                        onChange={(e) => setTip(Math.max(0, parseFloat(e.target.value) || 0))} 
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
                <div className="summary-item">
                    <span>CREDIT BALANCE</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                </div>

                <div className="payment-options">
                    <button onClick={handleCOD} className="cod">Cash On Delivery</button>
                    <button onClick={handleUPI} className="upi">UPI</button>
                </div>

                <div className="payment-options">
                    <button onClick={handlecredit} className="cod">Credit</button>
                </div>
                <div className="payment-options">
                    <button style={{backgroundColor:"blue"}} onClick={handleorderhistory} className="cod">Order History</button>
                </div>
            </div>
        </div>
    );
};

export default OrderCheckout;
