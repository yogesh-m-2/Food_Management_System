import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function OrdersSummaryTable() {
  const [orders, setOrders] = useState([]);
  const [summaries, setSummaries] = useState([]);

  // Fetch orders from backend
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/filter/Credit", {
        params: {
          orderedRole: "Staff",
          paymentType: "CREDIT",
          paymentStatus: null // will be sent as 'paymentStatus='
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
    }
  };
  
  

  // Summarize by user
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
        };
      }

      grouped[userId].totalPrice += order.price;
      if (!order.paymentRecived) {
        grouped[userId].allPaid = false;
      }
    });

    setSummaries(Object.values(grouped));
  };

  const markAsPaid = (userId) => {
    console.log(`Marking as paid for user ${userId}`);
    // Here you can call an API like:
    // fetch(`/api/orders/markPaid/${userId}`, { method: 'POST' })

    // Simulate UI update
    setSummaries((prev) =>
      prev.map((group) =>
        group.orderedUserId === userId
          ? { ...group, allPaid: true }
          : group
      )
    );
  };

  return (
    <div>
      {/* <h2>Payment Summary</h2> */}
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
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
    </div>
  );
}
