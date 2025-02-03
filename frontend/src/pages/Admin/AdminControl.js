import React, { useState, useEffect } from "react";
import "../../styles/admin/AdminControl.css";
import api from "../../services/api"; // Import the api.js file

const sections = ["Menu", "Patient", "Staff", "Dietitian", "Delivery"];

const AdminControl = () => {
  const [activeSection, setActiveSection] = useState("Menu");
  const [menuItems, setMenuItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "", picture: "", description: "", isAvailable: true });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await api.get("/menu-items");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleAdd = async () => {
    if (newItem.name && newItem.price && newItem.category) {
      try {
        const response = await api.post("/menu-items", newItem);
        setMenuItems([...menuItems, response.data]);
        setNewItem({ name: "", price: "", category: "", picture: "", description: "", isAvailable: true });
        setShowAddForm(false);
      } catch (error) {
        console.error("Error adding menu item:", error);
      }
    }
  };

  const handleEdit = async (id) => {
    const updatedItem = { ...editItem };
    try {
      const response = await api.put(`/menu-items/${id}`, updatedItem);
      setMenuItems(menuItems.map(item => item.id === id ? response.data : item));
      setEditItem(null);
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.delete(`/menu-items/${id}`);
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editItem) {
      setEditItem({ ...editItem, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setShowAddForm(true);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        {sections.map((section) => (
          <button
            key={section}
            className={activeSection === section ? "active" : ""}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      <div className="content">
        <h2>{activeSection} Management</h2>
        {activeSection === "Menu" && (
          <>
            <button className="add-btn" onClick={() => setShowAddForm(true)}>Add Item</button>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Upload Picture</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.picture ? (
          <img
            src={item.picture}
            alt={item.name}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        ) : (
          "No Image"
        )}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <button className="edit-btn" onClick={() => openEditModal(item)}>✏️</button>
                    </td>
                    <td>
                      <button className="remove-btn" onClick={() => handleRemove(item.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {showAddForm && (
          <div className="modal">
            <div className="modal-content">
              <h3>{editItem ? "Edit Item" : "Add New Item"}</h3>
              <input
                type="text"
                name="name"
                placeholder="Item name"
                value={editItem ? editItem.name : newItem.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={editItem ? editItem.price : newItem.price}
                onChange={handleChange}
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={editItem ? editItem.category : newItem.category}
                onChange={handleChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={editItem ? editItem.description : newItem.description}
                onChange={handleChange}
              />
              <input
                type="file"
                name="picture"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (editItem) {
                      setEditItem({ ...editItem, picture: reader.result });
                    } else {
                      setNewItem({ ...newItem, picture: reader.result });
                    }
                  };
                  if (file) reader.readAsDataURL(file);
                }}
              />
              <button className="save-btn" onClick={() => (editItem ? handleEdit(editItem.id) : handleAdd())}>
                Save
              </button>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminControl;
