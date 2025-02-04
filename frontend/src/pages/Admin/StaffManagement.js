import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Assuming you have an 'api' instance setup for Axios

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    employeeId: "",
    name: "",
    department: "",
    role: "",
    mobileNumber: "",
    password: "",
    paymentDetails: "",
  });
  const [editStaff, setEditStaff] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await api.get("/staff");
      setStaffList(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const handleAdd = async () => {
    if (newStaff.name && newStaff.employeeId) {
      try {
        const response = await api.post("/staff", newStaff);
        setStaffList([...staffList, response.data]);
        setNewStaff({
          employeeId: "",
          name: "",
          department: "",
          role: "",
          mobileNumber: "",
          password: "",
          paymentDetails: "",
        });
        setShowAddForm(false);
      } catch (error) {
        console.error("Error adding staff:", error);
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await api.put(`/staff/${id}`, editStaff);
      setStaffList(staffList.map(staff => (staff.id === id ? response.data : staff)));
      setEditStaff(null);
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.delete(`/staff/${id}`);
      setStaffList(staffList.filter(staff => staff.id !== id));
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editStaff) {
      setEditStaff({ ...editStaff, [name]: value });
    } else {
      setNewStaff({ ...newStaff, [name]: value });
    }
  };

  const openEditModal = (staff) => {
    setEditStaff(staff);
    setShowAddForm(true);
  };

  return (
    <div className="staff-management">
      <button onClick={() => setShowAddForm(true)}>Add New Staff</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.name}</td>
              <td>{staff.employeeId}</td>
              <td>{staff.role}</td>
              <td>
                <button onClick={() => openEditModal(staff)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleRemove(staff.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editStaff ? "Edit Staff" : "Add New Staff"}</h3>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={editStaff ? editStaff.employeeId : newStaff.employeeId}
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editStaff ? editStaff.name : newStaff.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={editStaff ? editStaff.role : newStaff.role}
              onChange={handleChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={editStaff ? editStaff.department : newStaff.department}
              onChange={handleChange}
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={editStaff ? editStaff.mobileNumber : newStaff.mobileNumber}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={editStaff ? editStaff.password : newStaff.password}
              onChange={handleChange}
            />
            <input
              type="text"
              name="paymentDetails"
              placeholder="Payment Details"
              value={editStaff ? editStaff.paymentDetails : newStaff.paymentDetails}
              onChange={handleChange}
            />
            <button onClick={() => (editStaff ? handleEdit(editStaff.id) : handleAdd())}>
              Save
            </button>
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
