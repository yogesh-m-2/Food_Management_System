import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../../services/api"; // API module
import '../../styles/staff/OrderCheckout.css'; // Import CSS

const DietitianOrderCheckout = () => {
    const location = useLocation();
    const { selectedDiets = {}, dietItems = [], itemDateTime = {}, orderedUserId,OrderpatientName } = location.state || {};
    const navigate = useNavigate();
    const [tip, setTip] = useState(0);
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(true);

    // Calculate total price for each item
    const calculateItemTotal = (item, quantity) => item.dietitianPrice * quantity;

    // Calculate total order cost
    const orderTotal = Object.keys(selectedDiets).reduce((total, itemId) => {
        const item = dietItems.find(menuItem => menuItem.id === parseInt(itemId));
        return total + calculateItemTotal(item, selectedDiets[itemId]);
    }, 0);

    // Fixed fees
    const deliveryFee = 48;
    const platformFee = 10;
    const gstAndCharges = 35.55;

    // Grand total calculation
    const grandTotal = orderTotal + deliveryFee + platformFee + gstAndCharges + tip;

    // Handle address submission
    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    // Handle Cash On Delivery (COD) payment
    const handleCOD = async () => {
        const orderDetails = {
            orderedRole: "Patient",
            orderedName: OrderpatientName,
            orderedUserId: orderedUserId,
            itemName: Object.keys(selectedDiets).map(itemId => {
                const item = dietItems.find(menuItem => menuItem.id === parseInt(itemId));
                return item.name;
            }).join(", "),
            quantity: Object.values(selectedDiets).reduce((acc, qty) => acc + qty, 0),
            category: "South", 
            price: orderTotal,
            orderStatus: null,
            paymentType: "COD",
            paymentStatus: null,
            orderDateTime: new Date().toISOString(),
            address: address,
        };

        try {
            const response = await api.post("/orders", orderDetails);
            console.log("Order submitted successfully", response.data);
            navigate("/dietitian/order-success", { state: { orderHistoryRedirect: "/dietitian/orderhistory", orderedUserId: orderedUserId, orderedRole: "Patient" } });
        } catch (error) {
            console.error("Order submission failed", error);
            alert("There was an issue submitting your order.");
        }
    };

    // Format date time
    const formatDateTime = (dateTime) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const formattedDate = new Date(dateTime).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    return (
        <div className="order-checkout-container">
            {/* Order Summary */}
            <div className="order-details">
                <h2>Order Summary</h2>
                <div className="order-item-table">
                    <div className="table-header">
                        <span className="column-item">Item</span>
                        <span className="column-qty">Qty</span>
                        <span className="column-price">Total Price</span>
                        <span className="column-time">Time</span> {/* New column for Time */}
                    </div>
                    {Object.keys(selectedDiets).map(itemId => {
                        const item = dietItems.find(menuItem => menuItem.id === parseInt(itemId));
                        const orderTime = itemDateTime[itemId] || new Date(); // Use the specific time for the item
                        return (
                            <div key={itemId} className="table-row">
                                <span className="column-item">{item.name}</span>
                                <span className="column-qty">{selectedDiets[itemId]}</span>
                                <span className="column-price">{calculateItemTotal(item, selectedDiets[itemId])}</span>
                                <span className="column-time">{formatDateTime(orderTime)}</span> {/* Display formatted date time */}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Delivery Address */}
            <div className="delivery-details">
                <h2>Delivery Details</h2>
                {isEditing ? (
                    <form onSubmit={handleAddressSubmit}>
                        <textarea 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            placeholder="Enter your delivery address" 
                            className="address-input"
                            required
                        />
                        <button type="submit" className="address-submit">Save Address</button>
                    </form>
                ) : (
                    <div>
                        <p>{address}</p>
                        <button onClick={() => setIsEditing(true)} className="edit-address">Edit Address</button>
                    </div>
                )}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
                <h2>Order Total:</h2>
                <div className="summary-item"><span>Item Total</span><span>${orderTotal}</span></div>
                <div className="summary-item"><span>Delivery Fee (4.0 kms)</span><span>${deliveryFee}</span></div>
                <div className="summary-item">
                    <span>Delivery Tip</span>
                    <input 
                        type="number" 
                        value={tip} 
                        onChange={(e) => setTip(parseFloat(e.target.value) || 0)} 
                        placeholder="Enter tip" 
                        className="tip-input"
                    />
                </div>
                <div className="summary-item"><span>Platform Fee</span><span>${platformFee}</span></div>
                <div className="summary-item"><span>GST and Restaurant Charges</span><span>${gstAndCharges}</span></div>
                <div className="summary-item total"><span>TO PAY</span><span>${grandTotal.toFixed(2)}</span></div>

                {/* Payment Options */}
                <div className="payment-options">
                    <button onClick={handleCOD} className="cod">Confirm Diet</button>
                </div>
            </div>
        </div>
    );
};

export default DietitianOrderCheckout;
