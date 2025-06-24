import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Axios instance assumed

const DietitianManagement = () => {
  const [dietitians, setDietitians] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDietitian, setNewDietitian] = useState({
    name: "",
    username: "",
    password: "",
    specialization: "",
  });
  const [editDietitian, setEditDietitian] = useState(null);

  useEffect(() => {
    fetchDietitians();
  }, []);

  const fetchDietitians = async () => {
    try {
      const response = await api.get("/dietitian");
      setDietitians(response.data);
    } catch (error) {
      console.error("Error fetching dietitians:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    const data = editDietitian || newDietitian;
    const { name, username, password, specialization } = data;

    // Validation - collect missing fields
    const missingFields = [];
    if (!name.trim()) missingFields.push("Name");
    if (!username.trim()) missingFields.push("Username");
    if (!password.trim()) missingFields.push("Password");
    if (!specialization.trim()) missingFields.push("Specialization");

    if (missingFields.length > 0) {
      alert(`Please fill in the following field(s):\n- ${missingFields.join("\n- ")}`);
      return;
    }

    try {
      if (editDietitian) {
        const response = await api.put(`/dietitian/${editDietitian.id}`, editDietitian);
        setDietitians(dietitians.map(d => (d.id === editDietitian.id ? response.data.data : d)));
      } else {
        const response = await api.post("/dietitian", newDietitian);
        setDietitians([...dietitians, response.data.data]);
      }
      resetForm();
    } catch (error) {
      if (error.response?.status === 409) {
        alert(error.response.data.message);
      } else if (error.response?.status === 500) {
        alert("Server is not working.");
      } else {
        alert("An unexpected error occurred.");
        console.error(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/dietitian/${id}`);
      setDietitians(dietitians.filter(d => d.id !== id));
    } catch (error) {
      console.error("Error deleting dietitian:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editDietitian) {
      setEditDietitian({ ...editDietitian, [name]: value });
    } else {
      setNewDietitian({ ...newDietitian, [name]: value });
    }
  };

  const openEditForm = (dietitian) => {
    setEditDietitian({ ...dietitian, password: "" }); // Clear password for security
    setShowForm(true);
  };

  const resetForm = () => {
    setNewDietitian({ name: "", username: "", password: "", specialization: "" });
    setEditDietitian(null);
    setShowForm(false);
  };

  const currentData = editDietitian || newDietitian;

  return (
    <div className="dietitian-management">
      <button onClick={() => setShowForm(true)}>Add New Dietitian</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Specialization</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {dietitians.map((dietitian) => (
            <tr key={dietitian.id}>
              <td>{dietitian.name}</td>
              <td>{dietitian.username}</td>
              <td>{dietitian.specialization}</td>
              <td>
                <button onClick={() => openEditForm(dietitian)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(dietitian.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editDietitian ? "Edit Dietitian" : "Add New Dietitian"}</h3>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={currentData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={currentData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={currentData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={currentData.specialization}
              onChange={handleChange}
              required
            />

            <button onClick={handleAddOrUpdate}>Save</button>
            <button onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietitianManagement;
