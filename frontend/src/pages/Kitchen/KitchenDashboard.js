import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/kitchen/KitchenDashboard.css";
import config from "../../config";
import SockJS from 'sockjs-client';
import { FaBell } from "react-icons/fa"; // Bell icon


const KitchenDashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);  
  const [filters, setFilters] = useState({
    orderId: "",
    orderedName: "",
    itemName: "",
    quantity: "",
    price: "",
    paymentType: "",
    address: "",
    orderStatus: "",
  });


  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.orderDateTime) - new Date(a.orderDateTime)
      );
      setAllOrders(sortedOrders);
      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // const socket = new SockJS(`http://${config.Socket_URL}/order-updates`);
    const socket = new SockJS(`http://170.187.200.195:8142/order-updates`);


    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const newOrder = message.payload;

      setAllOrders((prevOrders) => {
        if (message.type === "ORDER_UPDATED") {
          return prevOrders.map((order) =>
            order.orderId === newOrder.orderId ? newOrder : order
          );
        } else if (message.type === "ORDER_CREATED") {
          const newNotification = {
            id: Date.now(),
            orderId: newOrder.orderId,
            orderedName: newOrder.orderedName,
            itemName: newOrder.itemName,
            quantity: newOrder.quantity,
          };
        
          setNotifications((prev) => [newNotification, ...prev]);
        
          return [newOrder, ...prevOrders];
        }
        
        return prevOrders;
      });
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    const filtered = allOrders.filter((order) => {
      return (
        (filters.orderId === "" || order.orderId.toString().includes(filters.orderId)) &&
        (filters.orderedName === "" || (order.orderedName || " ").toLowerCase().includes(filters.orderedName.toLowerCase())) &&
        (filters.itemName === "" || order.itemName.toLowerCase().includes(filters.itemName.toLowerCase())) &&
        (filters.quantity === "" || order.quantity.toString().includes(filters.quantity)) &&
        (filters.price === "" || order.price.toString().startsWith(filters.price)) &&
        (filters.paymentType === "" || order.paymentType.toLowerCase().includes(filters.paymentType.toLowerCase())) &&
        (filters.address === "" || order.address.toLowerCase().includes(filters.address.toLowerCase())) &&
        (filters.orderStatus === "" || order.orderStatus === filters.orderStatus)
      );
    });

    setOrders(filtered);
  }, [filters, allOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status?orderStatus=${newStatus}`);
      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="kitchen-dashboard-container">
      {/* {newOrderAlert && (
        <div className="order-toast">
          <strong>New Order Received!</strong><br />
          <strong>Order ID:</strong> {newOrderAlert.orderId}<br />
          <strong>Name:</strong> {newOrderAlert.orderedName}<br />
          <strong>Item:</strong> {newOrderAlert.itemName}<br />
          <strong>Quantity:</strong> {newOrderAlert.quantity}<br />
        </div>
      )} */}
  
  <div className="notification-bell">
  <button className="bell-btn" onClick={() => setShowNotifications(!showNotifications)}>
    <FaBell style={{color:"green"}} size={24} />
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
              <div><strong>Name:</strong> {n.orderedName}</div>
              <div>
              <strong>Item:</strong>
              <ul className="notification-item-list">
                {n.itemName.split(',').map((item, idx) => (
                  <li key={idx}>{item.trim()}</li>
                ))}
              </ul>
            </div>

              <div><strong>Quantity:</strong> {n.quantity}</div>
            </div>
          </div>
          <button
            className="dismiss-btn"
            onClick={() => setNotifications((prev) => prev.filter((notif) => notif.id !== n.id))}
          >
            ×
          </button>
        </div>
      ))
    )}
  </div>
)}

</div>

      <h2>Kitchen Orders Dashboard</h2>
  
      <div className="orders-list">
        <table className="orders-table">
          <thead>
            {/* Table Headers */}
            <tr>
              <th>Order ID</th>
              <th>Ordered By</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Address</th>
              <th>Order Status</th>
            </tr>
  
            {/* Filters */}
            <tr>
              <th className = "table-serach"><input placeholder="Order ID" value={filters.orderId} onChange={(e) => handleFilterChange("orderId", e.target.value)} /></th>
              <th className = "table-serach"><input placeholder="Name" value={filters.orderedName} onChange={(e) => handleFilterChange("orderedName", e.target.value)} /></th>
              <th className = "table-serach"><input placeholder="Item" value={filters.itemName} onChange={(e) => handleFilterChange("itemName", e.target.value)} /></th>
              <th className = "table-serach"><input placeholder="Qty" value={filters.quantity} onChange={(e) => handleFilterChange("quantity", e.target.value)} /></th>
              <th className = "table-serach"><input placeholder="Price" value={filters.price} onChange={(e) => handleFilterChange("price", e.target.value)} /></th>
              <th className = "table-serach"><input placeholder="Payment" value={filters.paymentType} onChange={(e) => handleFilterChange("paymentType", e.target.value)} /></th>
              <th className = "table-serach"><input placeholder="Address" value={filters.address} onChange={(e) => handleFilterChange("address", e.target.value)} /></th>
              <th className = "table-serach">
                <select value={filters.orderStatus} onChange={(e) => handleFilterChange("orderStatus", e.target.value)}>
                  <option value="">All</option>
                  <option value="RECEIVED">Received</option>
                  <option value="PREPARED">Prepared</option>
                  <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                </select>
              </th>
            </tr>
          </thead>
  
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px"}}>
                  No orders available.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderedName}</td>
                  <td>
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                      {order.itemName.split(',').map((item) => {
                        const [name, qty] = item.trim().split(' X ');
                        return `${name?.trim()} X ${qty?.trim()}`;
                      }).join('\n')}
                    </pre>
                  </td>
                  <td  style={{ margin: 0, width : "auto" }}>{order.quantity}</td>
                  <td>₹{order.price}</td>
                  <td>{order.paymentType}</td>
                  <td>{order.address}</td>
                  <td>
                    <select
                      value={order.orderStatus || "RECEIVED"}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      style={{ margin: 0, width : "auto" }}
                    >
                      <option value="RECEIVED">Order Received</option>
                      <option value="PREPARED">Prepared</option>
                      <option value="OUT_FOR_DELIVERY">Sent for Delivery</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default KitchenDashboard;
