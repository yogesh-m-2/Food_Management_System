import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../../services/api";
import "../../styles/orderhistory/OrderHistory.css"; // Import the CSS file for styling

const OrderHistory = () => {
    const location = useLocation();
    const { orderedUserId: stateOrderedUserId, orderedRole: stateOrderedRole } = location.state || {};

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let orderedUserId = stateOrderedUserId;
                let orderedRole = stateOrderedRole || "Staff"; // Default role

                // If no state was passed, fallback to JWT token decoding
                if (!orderedUserId) {
                    const token = localStorage.getItem("jwtToken");
                    if (!token) {
                        throw new Error("User is not authenticated");
                    }
                    const decodedToken = jwtDecode(token);
                    orderedUserId = decodedToken.sub;
                }

                // API request to fetch orders
                const response = await api.get(`/orders/filter?orderedRole=${orderedRole}&orderedUserId=${orderedUserId}`);
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to fetch orders.");
                setLoading(false);
            }
        };

        fetchOrders();
    }, [stateOrderedUserId, stateOrderedRole]);

    return (
        <div className="order-history-container">
            <h2>Order History</h2>

            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="order-history-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Ordered Name</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Order Status</th>
                            <th>Payment Type</th>
                            <th>Payment Status</th>
                            <th>Order Date</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.orderedName}</td>
                                <td>{order.itemName}</td>
                                <td>{order.quantity}</td>
                                <td>{order.category}</td>
                                <td>${order.price.toFixed(2)}</td>
                                <td>{order.orderStatus || "Pending"}</td>
                                <td>{order.paymentType}</td>
                                <td>{order.paymentStatus || "Pending"}</td>
                                <td>{new Date(order.orderDateTime).toLocaleString()}</td>
                                <td>{order.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderHistory;
