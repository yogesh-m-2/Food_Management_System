import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/delivery/DeliveryDashboard.css";
import config from "../../config";

const DeliveryDashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newOrderAlert, setNewOrderAlert] = useState(null);
  const [filters, setFilters] = useState({
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

    const socket = new WebSocket(`ws://${config.Socket_URL}/order-updates`);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const orderData = message.payload;

      if (message.type === "ORDER_UPDATED" && orderData.orderStatus === "OUT_FOR_DELIVERY") {
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
        fetchOrders();
      }
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    const filtered = allOrders.filter((order) =>
      (!filters.orderedName || order.orderedName.toLowerCase().includes(filters.orderedName.toLowerCase())) &&
      (!filters.itemName || order.itemName.toLowerCase().includes(filters.itemName.toLowerCase())) &&
      (!filters.quantity || order.quantity.toString().includes(filters.quantity)) &&
      (!filters.price || order.price.toString().includes(filters.price)) &&
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
      {newOrderAlert && <div className="alert">{newOrderAlert}</div>}
      <h2>Delivery Orders Dashboard</h2>

      <div className="orders-list">
        <div className="orders-table">
          {/* Header */}
          <div className="table-header">
            <span className="column-item">Ordered By</span>
            <span className="column-item">Item</span>
            <span className="column-item">Quantity</span>
            <span className="column-item">Price</span>
            <span className="column-item">Payment</span>
            <span className="column-item">Payment Received</span>
            <span className="column-item">Order Date</span>
            <span className="column-item">Delivery Status</span>
            <span className="column-item">Address</span>
            <span className="column-item">Phone No</span>
          </div>

          {/* Filters */}
          <div className="table-filters">
            <input className="column-item" placeholder="Name" value={filters.orderedName} onChange={(e) => handleFilterChange("orderedName", e.target.value)} />
            <input className="column-item" placeholder="Item" value={filters.itemName} onChange={(e) => handleFilterChange("itemName", e.target.value)} />
            <input className="column-item" placeholder="Qty" value={filters.quantity} onChange={(e) => handleFilterChange("quantity", e.target.value)} />
            <input className="column-item" placeholder="Price" value={filters.price} onChange={(e) => handleFilterChange("price", e.target.value)} />
            <input className="column-item" placeholder="Payment" value={filters.paymentType} onChange={(e) => handleFilterChange("paymentType", e.target.value)} />
            <select className="column-item" value={filters.paymentRecived} onChange={(e) => handleFilterChange("paymentRecived", e.target.value)}>
              <option value="">All</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <span className="column-item"></span>
            <select className="column-item" value={filters.deliveryStatus} onChange={(e) => handleFilterChange("deliveryStatus", e.target.value)}>
              <option value="">All</option>
              <option value="OrderReceived">Order Received</option>
              <option value="OutForDelivery">Out for Delivery</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Delivered">Delivered</option>
            </select>
            <input className="column-item" placeholder="Address" value={filters.address} onChange={(e) => handleFilterChange("address", e.target.value)} />
            <input className="column-item" placeholder="Phone" value={filters.phoneNo} onChange={(e) => handleFilterChange("phoneNo", e.target.value)} />
          </div>

          {/* Rows */}
          {orders.length === 0 ? (
            <div className="table-row no-orders" style={{ gridColumn: "span 10", textAlign: "center", padding: "20px", color: "#777" }}>
              No orders found.
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.orderId} className="table-row">
                <span className="column-item">{order.orderedName}</span>
                <span className="column-item">{order.itemName}</span>
                <span className="column-item">{order.quantity}</span>
                <span className="column-item">₹{order.price}</span>
                <span className="column-item">{order.paymentType}</span>
                <span className="column-item">
                  <select
                    value={String(order.paymentRecived)}
                    onChange={(e) => updatePaymentReceived(order.orderId, e.target.value === "true")}
                    disabled={["CREDIT", "UPI"].includes(order.paymentType) || order.paymentRecived === true}
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </span>
                <span className="column-item">{new Date(order.orderDateTime).toLocaleString()}</span>
                <span className="column-item">
                  <select value={order.deliveryStatus || "OrderReceived"} onChange={(e) => updateDeliveryStatus(order.orderId, e.target.value)}>
                    <option value="OrderReceived">Order Received</option>
                    <option value="OutForDelivery">Out for Delivery</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </span>
                <span className="column-item">{order.address}</span>
                <span className="column-item">{order.phoneNo || "N/A"}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
