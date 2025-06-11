import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import "../../styles/admin/Paymentin.css";

export default function OrdersSummaryTable() {
  const [orders, setOrders] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("Staff");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [roleFilter]); // Refetch when role changes

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders/filter/Credit", {
        params: {
          orderedRole: roleFilter,
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
    const unpaidOrders = orders.filter(
      (o) => o.orderedUserId === userId && !o.paymentRecived
    );
    const unpaidOrderIds = unpaidOrders.map((o) => o.orderId);
  
    if (unpaidOrderIds.length === 0) {
      alert("No unpaid orders to mark as paid.");
      return;
    }
  
    const summary = summaries.find((s) => s.orderedUserId === userId);
    const totalAmount = unpaidOrders.reduce((sum, order) => sum + order.price, 0);
  
    try {

      const markPaidResponse = await api.put("/orders/markPaid", unpaidOrderIds);
  

      if (markPaidResponse.status === 200) {
        await api.post("/api/credit-payments", {
          userId: userId,
          role: summary.orderedRole.toUpperCase(),
          amount: totalAmount,
          orders: unpaidOrderIds.join(","),
          paymentType: "CREDIT",
          paid: true 
        });
  
        fetchOrders();
      } else {
        alert("Failed to mark orders as paid.");
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      alert("Failed to process payment.");
    }
  };
  


  const filteredSummaries = summaries.filter((summary) =>
    summary.orderedUserId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orders-table-container">
      <div className="filter-section">
        <label>
          Category:
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="Staff">Staff</option>
            <option value="Patient">Patient</option>
          </select>
        </label>
        <label>
          Search by User ID:
          <input
            type="text"
            placeholder="Enter User ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : filteredSummaries.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Role</th>
              <th>Total Price</th>
              <th>Total Orders</th> 
              <th>Payment Type</th>
              <th>Payment Received</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSummaries.map((summary) => (
              <tr key={summary.orderedUserId}>
                <td>{summary.orderedUserId}</td>
                <td>{summary.orderedRole}</td>
                <td>₹{summary.totalPrice.toFixed(2)}</td>
                <td>{summary.orderIds.length}</td>
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
