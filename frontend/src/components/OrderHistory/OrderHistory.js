import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../services/api";
import "../../styles/orderhistory/OrderHistory.css";

const OrderHistory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderedUserId: stateOrderedUserId, orderedRole: stateOrderedRole } = location.state || {};

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Orderedroledecode, setOrderedRoleDecode] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let orderedUserId = stateOrderedUserId;
                let orderedRole = stateOrderedRole || "Staff";

                if (!orderedUserId) {
                    const token = localStorage.getItem("jwtToken");
                    if (!token) throw new Error("User is not authenticated");
                    const decodedToken = jwtDecode(token);
                    orderedUserId = decodedToken.sub;
                }

                const token = localStorage.getItem("jwtToken");
                const decodedToken = jwtDecode(token);
                const role = decodedToken.Role;
                setOrderedRoleDecode(role);

                const response = await api.get(`/orders/filter?orderedRole=${orderedRole}&orderedUserId=${orderedUserId}`);
                const sortedData = response.data.sort((a, b) => b.orderId - a.orderId);
                setOrders(sortedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to fetch orders.");
                setLoading(false);
            }
        };

        fetchOrders();
    }, [stateOrderedUserId, stateOrderedRole]);

    // Click handler for link
    const handleDietitianAction = () => {
        // Example action: navigate or open link
        navigate("/dietitian/dietitian-dashboard"); // or use window.location.href for external link
    };

    return (
        <div className="order-history-container" style={{ position: "relative" }}>
            {/* Conditional link top-left */}
            {["Dietitian", "Staff", "Patient"].includes(Orderedroledecode) && (
                <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    zIndex: 1000
                }}>
                    <button
                        onClick={() => {
                            if (Orderedroledecode === "Dietitian") {
                                navigate("/dietitian/dietitian-dashboard");
                            } else if (Orderedroledecode === "Staff") {
                                navigate("/staff/order");
                            } else if (Orderedroledecode === "Patient") {
                                navigate("/patient/order");
                            }
                        }}
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "8px 12px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            transition: "background-color 0.2s ease"
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                        {Orderedroledecode === "Dietitian" && "Go to Dietitian Dashboard"}
                        {Orderedroledecode === "Staff" && "Go to Staff Panel"}
                        {Orderedroledecode === "Patient" && "Go to Patient Profile"}
                    </button>
                </div>
            )}

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
                                <td>₹{order.price.toFixed(2)}</td>
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
