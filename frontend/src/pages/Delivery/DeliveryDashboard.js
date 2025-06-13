import React, { useEffect, useState } from "react";
import api from "../../services/api"; // Import API service
import "../../styles/delivery/DeliveryDashboard.css"; // Reusing the same styles
import config from "../../config";

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newOrderAlert, setNewOrderAlert] = useState(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/out-for-delivery");
      // Sort orders by orderDateTime in descending order (latest first)
      console.log("Fetched Orders:", response.data);
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.orderDateTime) - new Date(a.orderDateTime)
      );
      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching delivery orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Set up WebSocket connection
    const socket = new WebSocket("ws://"+config.Socket_URL+"/order-updates");
    
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const orderData = message.payload;
    
      if (message.type === "ORDER_UPDATED") {
        if (orderData.orderStatus === "OUT_FOR_DELIVERY") {
          setNewOrderAlert(
            <>
              <strong>New Delivery Order:</strong><br />
              <strong>Customer:</strong> {orderData.orderedName}<br />
              <strong>Item:</strong> {orderData.itemName}<br />
              <strong>Address:</strong> {orderData.address}<br />
              <strong>Phone:</strong> {orderData.phoneNo || "N/A"}
            </>
          );
          
          setTimeout(() => setNewOrderAlert(null), 5000);
          fetchOrders(); // Refresh the orders list
        }
      }
    };
    

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const updateDeliveryStatus = async (orderId, deliveryStatus) => {
    try {
      await api.patch(`/orders/${orderId}/delivery-status`, null, {
        params: { deliveryStatus }
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  const updatePaymentReceived = async (orderId, paymentReceived) => {
    try {
      await api.patch(`/orders/${orderId}/payment-received`, null, {
        params: { paymentReceived }
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating payment received:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="delivery-dashboard-container">
      {newOrderAlert && <div className="alert">{newOrderAlert}</div>}
      <h2>Delivery Orders Dashboard</h2>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No orders out for delivery.</p>
        ) : (
          <div className="orders-table">
            <div className="table-header">
              <span className="column-item">Ordered By</span>
              <span className="column-item">Item</span>
              <span className="column-item">Quantity</span>
              {/* <span className="column-item">Category</span> */}
              <span className="column-item">Price</span>
              {/* <span className="column-item">Order Status</span> */}
              <span className="column-item">Payment</span>
              <span className="column-item">Payment Received</span>
              <span className="column-item">Order Date</span>
              <span className="column-item">Delivery Status</span>
              <span className="column-item">Address</span>
              <span className="column-item">Phone No</span>
            </div>
            {orders.map((order) => (
              <div key={order.orderId} className="table-row">
                <span className="column-item">{order.orderedName}</span>
                <span className="column-item">{order.itemName}</span>
                <span className="column-item">{order.quantity}</span>
                {/* <span className="column-item">{order.category}</span> */}
                <span className="column-item">₹{order.price}</span>
                {/* <span className="column-item">{order.orderStatus || "Pending"}</span> */}
                <span className="column-item">{order.paymentType}</span>
                <span className="column-item">
                <select
                    value={String(order.paymentRecived)} // typo used here
                    onChange={(e) => updatePaymentReceived(order.orderId, e.target.value === "true")}
                    disabled={order.paymentType === "CREDIT"}
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
              </span>
                <span className="column-item">{new Date(order.orderDateTime).toLocaleString()}</span>
                <span className="column-item">
                  <select
                    value={order.deliveryStatus || "OrderReceived"}
                    onChange={(e) => updateDeliveryStatus(order.orderId, e.target.value)}
                  >
                    <option value="OrderReceived">Order Received</option>
                    <option value="OutForDelivery">Out for Delivery</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </span>
                <span className="column-item">{order.address}</span>
                <span className="column-item">{order.phoneNo || "N/A"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;