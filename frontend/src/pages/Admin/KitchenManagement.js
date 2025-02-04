import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Assuming Axios instance is set up

const KitchenManagement = () => {
  const [kitchenUsers, setKitchenUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    userId: "",
    password: "",
  });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchKitchenUsers();
  }, []);

  const fetchKitchenUsers = async () => {
    try {
      const response = await api.get("/kitchen-users");
      setKitchenUsers(response.data);
    } catch (error) {
      console.error("Error fetching kitchen users:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editUser) {
        const response = await api.put(`/kitchen-users/${editUser.id}`, editUser);
        setKitchenUsers(kitchenUsers.map((user) => (user.id === editUser.id ? response.data : user)));
      } else {
        const response = await api.post("/kitchen-users", newUser);
        setKitchenUsers([...kitchenUsers, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving kitchen user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/kitchen-users/${id}`);
      setKitchenUsers(kitchenUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting kitchen user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editUser) {
      setEditUser({ ...editUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const openEditForm = (user) => {
    setEditUser(user);
    setShowForm(true);
  };

  const resetForm = () => {
    setNewUser({ userId: "", password: "" });
    setEditUser(null);
    setShowForm(false);
  };

  return (
    <div className="kitchen-management">
      <button onClick={() => setShowForm(true)}>Add Kitchen User</button>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {kitchenUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.userId}</td>
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
            <h3>{editUser ? "Edit Kitchen User" : "Add Kitchen User"}</h3>
            <input
              type="text"
              name="userId"
              placeholder="User ID"
              value={editUser ? editUser.userId : newUser.userId}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={editUser ? editUser.password : newUser.password}
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

export default KitchenManagement;
