import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import "../../styles/admin/Paymentin.css"; // Import the CSS file

export default function OrdersSummaryTable() {
  const [orders, setOrders] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/filter/Credit", {
        params: {
          orderedRole: "Staff",
          paymentType: "CREDIT",
          paymentStatus: null
        }
      });

      const originalData = response.data;

      if (!Array.isArray(originalData)) {
        console.error("Unexpected response format:", originalData);
        return;
      }

      setOrders(originalData);
      summarizeOrders(originalData);
    } catch (error) {
      console.error("Error fetching filtered orders:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const summarizeOrders = (orders) => {
    const grouped = {};

    orders.forEach((order) => {
      const userId = order.orderedUserId;

      if (!grouped[userId]) {
        grouped[userId] = {
          orderedUserId: userId,
          orderedRole: order.orderedRole,
          totalPrice: 0,
          paymentType: order.paymentType,
          allPaid: true,
          orderIds: []
        };
      }

      grouped[userId].totalPrice += order.price;
      grouped[userId].orderIds.push(order.orderId);

      if (!order.paymentRecived) {
        grouped[userId].allPaid = false;
      }
    });

    setSummaries(Object.values(grouped));
  };

  const markAsPaid = async (userId) => {
    // Get unpaid orders for this user
    const unpaidOrders = orders.filter(
      (o) => o.orderedUserId === userId && !o.paymentRecived
    );

    const unpaidOrderIds = unpaidOrders.map((o) => o.orderId);

    if (unpaidOrderIds.length === 0) {
      alert("No unpaid orders to mark as paid.");
      return;
    }

    try {
      await api.put("/orders/markPaid", unpaidOrderIds);
      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error("Error marking orders as paid:", error);
      alert("Failed to mark as paid.");
    }
  };

  return (
    <div className="orders-table-container">
    {loading ? (
      <p>Loading orders...</p>
    ) : summaries.length === 0 ? (
      <p>No orders found.</p>
    ) : (
      <table className="orders-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Role</th>
            <th>Total Price</th>
            <th>Payment Type</th>
            <th>Payment Received</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((summary) => (
            <tr key={summary.orderedUserId}>
              <td>{summary.orderedUserId}</td>
              <td>{summary.orderedRole}</td>
              <td>₹{summary.totalPrice.toFixed(2)}</td>
              <td>{summary.paymentType}</td>
              <td>{summary.allPaid ? 'Yes' : 'No'}</td>
              <td>
                {!summary.allPaid ? (
                  <button onClick={() => markAsPaid(summary.orderedUserId)}>
                    Mark as Paid
                  </button>
                ) : (
                  <span>✓ Paid</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  
  );
}
