import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/kitchen/KitchenDashboard.css";
import config from "../../config";

const KitchenDashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newOrderAlert, setNewOrderAlert] = useState(null);
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

    const socket = new WebSocket("ws://" + config.Socket_URL + "/order-updates");

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const newOrder = message.payload;

      setAllOrders((prevOrders) => {
        if (message.type === "ORDER_UPDATED") {
          return prevOrders.map((order) =>
            order.orderId === newOrder.orderId ? newOrder : order
          );
        } else if (message.type === "ORDER_CREATED") {
          setNewOrderAlert({
            orderId: newOrder.orderId,
            orderedName: newOrder.orderedName,
            itemName: newOrder.itemName,
            quantity: newOrder.quantity,
          });
          setTimeout(() => setNewOrderAlert(null), 5000);
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
        (filters.orderedName === "" || order.orderedName.toLowerCase().includes(filters.orderedName.toLowerCase())) &&
        (filters.itemName === "" || order.itemName.toLowerCase().includes(filters.itemName.toLowerCase())) &&
        (filters.quantity === "" || order.quantity.toString().includes(filters.quantity)) &&
        (filters.price === "" || order.price.toString().includes(filters.price)) &&
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
      {newOrderAlert && (
        <div className="order-toast">
          <strong>New Order Received!</strong><br />
          <strong>Order ID:</strong> {newOrderAlert.orderId}<br />
          <strong>Name:</strong> {newOrderAlert.orderedName}<br />
          <strong>Item:</strong> {newOrderAlert.itemName}<br />
          <strong>Quantity:</strong> {newOrderAlert.quantity}<br />
        </div>
      )}

      <h2>Kitchen Orders Dashboard</h2>
      <div className="orders-list">
  <div className="orders-table">
    {/* Table Header */}
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

    {/* Filters */}
    <div className="table-filters">
      <input className="column-item" placeholder="Order ID" value={filters.orderId} onChange={(e) => handleFilterChange("orderId", e.target.value)} />
      <input className="column-item" placeholder="Name" value={filters.orderedName} onChange={(e) => handleFilterChange("orderedName", e.target.value)} />
      <input className="column-item" placeholder="Item" value={filters.itemName} onChange={(e) => handleFilterChange("itemName", e.target.value)} />
      <input className="column-item" placeholder="Qty" value={filters.quantity} onChange={(e) => handleFilterChange("quantity", e.target.value)} />
      <input className="column-item" placeholder="Price" value={filters.price} onChange={(e) => handleFilterChange("price", e.target.value)} />
      <input className="column-item" placeholder="Payment" value={filters.paymentType} onChange={(e) => handleFilterChange("paymentType", e.target.value)} />
      <input className="column-item" placeholder="Address" value={filters.address} onChange={(e) => handleFilterChange("address", e.target.value)} />
      <select className="column-item" value={filters.orderStatus} onChange={(e) => handleFilterChange("orderStatus", e.target.value)}>
        <option value="">All</option>
        <option value="RECEIVED">Received</option>
        <option value="PREPARED">Prepared</option>
        <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
      </select>
    </div>

    {/* Rows */}
    {orders.length === 0 ? (
      <div className="table-row no-orders" style={{ gridColumn: "span 8", textAlign: "center", padding: "20px", color: "#777" }}>
        No orders available.
      </div>
    ) : (
      orders.map((order) => (
        <div key={order.orderId} className="table-row">
          <span className="column-item">{order.orderId}</span>
          <span className="column-item">{order.orderedName}</span>
          <span className="column-item">{order.itemName}</span>
          <span className="column-item">{order.quantity}</span>
          <span className="column-item">₹{order.price}</span>
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
      ))
    )}
  </div>
</div>

    </div>
  );
};

export default KitchenDashboard;
