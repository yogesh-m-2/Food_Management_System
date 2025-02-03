import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Assuming Axios instance is set up

const DeliveryManagement = () => {
  const [deliverUsers, setDeliverUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDeliverUser, setNewDeliverUser] = useState({
    name: "",
    username: "",
    password: "",
    contact: "",
  });
  const [editDeliverUser, setEditDeliverUser] = useState(null);

  useEffect(() => {
    fetchDeliverUsers();
  }, []);

  const fetchDeliverUsers = async () => {
    try {
      const response = await api.get("/delivery-user");
      setDeliverUsers(response.data);
    } catch (error) {
      console.error("Error fetching delivery users:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editDeliverUser) {
        // Update existing delivery user
        const response = await api.put(`/delivery-user/${editDeliverUser.id}`, editDeliverUser);
        setDeliverUsers(
          deliverUsers.map((d) =>
            d.id === editDeliverUser.id ? response.data : d
          )
        );
      } else {
        // Add new delivery user
        const response = await api.post("/delivery-user", newDeliverUser);
        setDeliverUsers([...deliverUsers, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving delivery user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/delivery-user/${id}`);
      setDeliverUsers(deliverUsers.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Error deleting delivery user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editDeliverUser) {
      setEditDeliverUser({ ...editDeliverUser, [name]: value });
    } else {
      setNewDeliverUser({ ...newDeliverUser, [name]: value });
    }
  };

  const openEditForm = (deliverUser) => {
    setEditDeliverUser(deliverUser);
    setNewDeliverUser(deliverUser); // Pre-fill form with current user data
    setShowForm(true);
  };

  const resetForm = () => {
    setNewDeliverUser({
      name: "",
      username: "",
      password: "",
      contact: "",
    });
    setEditDeliverUser(null);
    setShowForm(false);
  };

  return (
    <div className="delivery-management">
      <button onClick={() => setShowForm(true)}>Add New Delivery User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Contact</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {deliverUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.contact}</td>
              <td>
                <button onClick={() => openEditForm(user)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editDeliverUser ? "Edit Delivery User" : "Add New Delivery User"}</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editDeliverUser ? editDeliverUser.name : newDeliverUser.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={editDeliverUser ? editDeliverUser.username : newDeliverUser.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={editDeliverUser ? editDeliverUser.password : newDeliverUser.password}
              onChange={handleChange}
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={editDeliverUser ? editDeliverUser.contact : newDeliverUser.contact}
              onChange={handleChange}
            />
            <button onClick={handleAddOrUpdate}>Save</button>
            <button onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryManagement;
