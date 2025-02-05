import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/kitchen/KitchenDashboard.css";

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newOrderAlert, setNewOrderAlert] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data.sort((a, b) => new Date(b.orderDateTime) - new Date(a.orderDateTime)));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    const socket = new WebSocket("ws://127.0.0.1:8142/order-updates");
    socket.onmessage = (event) => {
      const newOrder = JSON.parse(event.data);
      setOrders((prevOrders) => [newOrder, ...prevOrders].sort((a, b) => new Date(b.orderDateTime) - new Date(a.orderDateTime)));
      
      setNewOrderAlert(`New order received: ${newOrder.itemName}`);
      setTimeout(() => setNewOrderAlert(null), 1000);
    };
    
    return () => socket.close();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status?orderStatus=${newStatus}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="kitchen-dashboard-container">
      {newOrderAlert && <div className="alert">{newOrderAlert}</div>}
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
                  <select
                    value={order.orderStatus || "RECEIVED"}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                  >
                    <option value="RECEIVED">Order Received</option>
                    <option value="PREPARED">Prepared</option>
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
