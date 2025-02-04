import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Assuming Axios instance is set up

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
    try {
      if (editDietitian) {
        const response = await api.put(`/dietitian/${editDietitian.id}`, editDietitian);
        setDietitians(dietitians.map(d => (d.id === editDietitian.id ? response.data : d)));
      } else {
        const response = await api.post("/dietitian", newDietitian);
        setDietitians([...dietitians, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving dietitian:", error);
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
    setEditDietitian(dietitian);
    setShowForm(true);
  };

  const resetForm = () => {
    setNewDietitian({ name: "", username: "", password: "", specialization: "" });
    setEditDietitian(null);
    setShowForm(false);
  };

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
            <input type="text" name="name" placeholder="Name" value={editDietitian ? editDietitian.name : newDietitian.name} onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" value={editDietitian ? editDietitian.username : newDietitian.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={editDietitian ? editDietitian.password : newDietitian.password} onChange={handleChange} />
            <input type="text" name="specialization" placeholder="Specialization" value={editDietitian ? editDietitian.specialization : newDietitian.specialization} onChange={handleChange} />
            <button onClick={handleAddOrUpdate}>Save</button>
            <button onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietitianManagement;