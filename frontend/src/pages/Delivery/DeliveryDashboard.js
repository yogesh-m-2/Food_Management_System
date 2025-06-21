import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/delivery/DeliveryDashboard.css";
import config from "../../config";
import SockJS from 'sockjs-client';
import { FaBell } from "react-icons/fa";

const DeliveryDashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);  
  const [filters, setFilters] = useState({
    orderId : "",
    orderedName: "",
    itemName: "",
    quantity: "",
    price: "",
    paymentType: "",
    paymentRecived: "",
    deliveryStatus: "",
    address: "",
    phoneNo: "",
  });

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/out-for-delivery");
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.orderDateTime) - new Date(a.orderDateTime)
      );
      setAllOrders(sortedOrders);
      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching delivery orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // const socket = new SockJS(`http://${config.Socket_URL}/order-updates`);
    const socket = new SockJS(`http://170.187.200.195:8142/order-updates`);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const orderData = message.payload;

      if (message.type === "ORDER_UPDATED" && orderData.orderStatus === "OUT_FOR_DELIVERY") {
        console.log("new notification received");
      
        const newNotification = {
          id: Date.now(),
          orderedName: orderData.orderedName,
          itemName: orderData.itemName,
          address: orderData.address,
          phoneNo: orderData.phoneNo || "N/A",
          orderId: orderData.orderId,
        };
      
        setNotifications((prev) => [newNotification, ...prev]);
        fetchOrders();
      }
      
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    const filtered = allOrders.filter((order) =>
      (filters.orderId === "" || order.orderId.toString().includes(filters.orderId)) &&
      (filters.orderedName === "" || (order.orderedName || " ").toLowerCase().includes(filters.orderedName.toLowerCase())) &&
      (!filters.itemName || order.itemName.toLowerCase().includes(filters.itemName.toLowerCase())) &&
      (!filters.quantity || order.quantity.toString().includes(filters.quantity)) &&
      (!filters.price || order.price.toString().startsWith(filters.price)) &&
      (!filters.paymentType || order.paymentType.toLowerCase().includes(filters.paymentType.toLowerCase())) &&
      (!filters.paymentRecived || String(order.paymentRecived) === filters.paymentRecived) &&
      (!filters.deliveryStatus || order.deliveryStatus === filters.deliveryStatus) &&
      (!filters.address || order.address.toLowerCase().includes(filters.address.toLowerCase())) &&
      (!filters.phoneNo || order.phoneNo?.includes(filters.phoneNo))
    );
    setOrders(filtered);
  }, [filters, allOrders]);

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

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="delivery-dashboard-container">
      <div className="notification-bell">
  <button className="bell-btn" onClick={() => setShowNotifications(!showNotifications)}>
    <FaBell className="bell-label" size={24} style={{color:"green"}}/>
    {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
  </button>

  {showNotifications && (
    <div className="notifications-panel">
      {notifications.length === 0 ? (
        <p style={{paddingLeft:"10px"}}>No notifications</p>
      ) : (
        notifications.map((n) => (
          <div key={n.id} className="notification-item">
            <div className="notification-content">
              <div className="notification-details">
                <div><strong>Order ID:</strong> {n.orderId}</div>
                <div><strong>Customer:</strong> {n.orderedName}</div>
                <div>
                  <strong>Item(s):</strong>
                  <ul className="notification-item-list">
                    {n.itemName.split(',').map((item, idx) => (
                      <li key={idx}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
                <div><strong>Address:</strong> {n.address}</div>
                <div><strong>Phone:</strong> {n.phoneNo}</div>
              </div>
            </div>
            <button
              className="dismiss-btn"
              onClick={() =>
                setNotifications((prev) =>
                  prev.filter((notif) => notif.id !== n.id)
                )
              }
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  )}
</div>


  
      <h2>Delivery Orders Dashboard</h2>
  
      <div className="orders-list">
        <table className="orders-table">
          <thead>
            {/* Headers */}
            <tr>
              <th>Order ID</th>
              <th>Ordered By</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Payment Received</th>
              <th>Order Date</th>
              <th>Delivery Status</th>
              <th>Address</th>
              <th>Phone No</th>
            </tr>
  
            {/* Filters */}
            <tr>
              <th className = "table-serach"><input placeholder="Order ID" value={filters.orderId} onChange={(e) => handleFilterChange("orderId", e.target.value)} /></th>
              <th className="table-search"><input placeholder="Name" value={filters.orderedName} onChange={(e) => handleFilterChange("orderedName", e.target.value)} /></th>
              <th className="table-search"><input placeholder="Item" value={filters.itemName} onChange={(e) => handleFilterChange("itemName", e.target.value)} /></th>
              <th className="table-search"><input placeholder="Qty" value={filters.quantity} onChange={(e) => handleFilterChange("quantity", e.target.value)} /></th>
              <th className="table-search"><input placeholder="Price" value={filters.price} onChange={(e) => handleFilterChange("price", e.target.value)} /></th>
              <th className="table-search"><input placeholder="Payment" value={filters.paymentType} onChange={(e) => handleFilterChange("paymentType", e.target.value)} /></th>
              <th className="table-search">
                <select value={filters.paymentRecived} onChange={(e) => handleFilterChange("paymentRecived", e.target.value)}>
                  <option value="">All</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </th>
              <th></th>
              <th className="table-search">
                <select value={filters.deliveryStatus} onChange={(e) => handleFilterChange("deliveryStatus", e.target.value)}>
                  <option value="">All</option>
                  <option value="OrderReceived">Order Received</option>
                  <option value="OutForDelivery">Out for Delivery</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </th>
              <th className="table-search"><input placeholder="Address" value={filters.address} onChange={(e) => handleFilterChange("address", e.target.value)} /></th>
              <th className="table-search"><input placeholder="Phone" value={filters.phoneNo} onChange={(e) => handleFilterChange("phoneNo", e.target.value)} /></th>
            </tr>
          </thead>
  
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: "20px" }}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderedName}</td>
                  <td>
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap", width : '200px' }}>
                      {order.itemName.split(',').map((item) => {
                        const [name, qty] = item.trim().split(' X ');
                        return `${name?.trim()} X ${qty?.trim()}`;
                      }).join('\n')}
                    </pre>
                  </td>
                  <td>{order.quantity}</td>
                  <td  style={{ margin: 0, width : "auto" }}>₹{order.price}</td>
                  <td>{order.paymentType}</td>
                  <td>
                    <select
                      value={String(order.paymentRecived)}
                      onChange={(e) => updatePaymentReceived(order.orderId, e.target.value === "true")}
                      disabled={["CREDIT", "UPI"].includes(order.paymentType) || order.paymentRecived === true}
                    >
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </select>
                  </td>
                  <td>{new Date(order.orderDateTime).toLocaleString()}</td>
                  <td>
                    <select
                      value={order.deliveryStatus || "OrderReceived"}
                      onChange={(e) => updateDeliveryStatus(order.orderId, e.target.value)}
                      style={{ margin: 0, whiteSpace: "pre-wrap", width : "auto" }}
                    >
                      <option value="OrderReceived">Order Received</option>
                      <option value="OutForDelivery">Out for Delivery</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td>{order.address}</td>
                  <td>{order.phoneNo || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default DeliveryDashboard;
