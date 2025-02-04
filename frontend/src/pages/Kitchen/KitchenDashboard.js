import React, { useEffect, useState } from "react";
import api from "../../services/api"; // Import your api module
import "../../styles/kitchen/KitchenDashboard.css"; // Make sure to add styling for the dashboard

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]); // State to hold the orders
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data); // Set the orders data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  // Handle the status change and send PUT request
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}`, {
        orderStatus: newStatus,
      });
      // Update the order status locally after successful PUT request
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Use useEffect to fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array means this effect runs once on mount

  // Render loading state or orders
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="kitchen-dashboard-container">
      <h2>Kitchen Orders Dashboard</h2>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          <div className="orders-table">
            <div className="table-header">
              <span className="column-item">Order ID</span>
              <span className="column-item">Ordered By</span>
              <span className="column-item">Item</span>
              <span className="column-item">Quantity</span>
              <span className="column-item">Price</span>
              <span className="column-item">Payment</span>
              <span className="column-item">Address</span>
              <span className="column-item">Order Status</span>
            </div>

            {/* Loop through orders and display them */}
            {orders.map((order) => (
              <div key={order.orderId} className="table-row">
                <span className="column-item">{order.orderId}</span>
                <span className="column-item">{order.orderedName}</span>
                <span className="column-item">{order.itemName}</span>
                <span className="column-item">{order.quantity}</span>
                <span className="column-item">${order.price}</span>
                <span className="column-item">{order.paymentType}</span>
                <span className="column-item">{order.address}</span>
                <span className="column-item">
                  {/* Dropdown for Order Status */}
                  <select
                    value={order.orderStatus || "RECEIVED"}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                  >
                    <option value="RECEIVED">Order Received</option>
                    <option value="PREPARED">Cooking</option>
                    <option value="OUT_FOR_DELIVERY">Sent for Delivery</option>
                  </select>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenDashboard;
