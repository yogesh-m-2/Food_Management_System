import React, { useState } from "react";
import "../../styles/admin/AdminControl.css";

const sections = ["Menu", "Patient", "Staff", "Dietitian", "Delivery"];

const initialMenuItems = [
  { id: 1, name: "Idly", price: "10rs", category: "Breakfast" },
  { id: 2, name: "Vada", price: "12rs", category: "Breakfast" },
  { id: 3, name: "Dosa", price: "40rs", category: "North" },
  { id: 4, name: "Poori", price: "10rs", category: "South" },
  { id: 5, name: "Tea", price: "12rs", category: "Beverages" },
  { id: 6, name: "Coffee", price: "40rs", category: "Beverages" },
];

const AdminControl = () => {
  const [activeSection, setActiveSection] = useState("Menu");
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);  // Track if the edit modal is shown
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });
  const [currentItem, setCurrentItem] = useState(null);  // Store the item being edited

  const handleAdd = () => {
    if (newItem.name && newItem.price && newItem.category) {
      setMenuItems([...menuItems, { id: Date.now(), ...newItem }]);
      setNewItem({ name: "", price: "", category: "" });
      setShowAddForm(false);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = menuItems.find(item => item.id === id);
    setCurrentItem(itemToEdit);  // Set the item to be edited
    setShowEditForm(true);  // Show the edit modal
  };

  const handleSaveEdit = () => {
    if (currentItem.name && currentItem.price && currentItem.category) {
      setMenuItems(menuItems.map(item =>
        item.id === currentItem.id ? currentItem : item
      ));
      setShowEditForm(false);  // Close the modal
      setCurrentItem(null);  // Clear the current item
    }
  };

  const handleRemove = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
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
            <button className="add-btn" onClick={() => setShowAddForm(true)}>Add</button>
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
                    <td><button className="upload-btn">Upload Pic</button></td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(item.id)}>✏️</button>
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

        {/* Add Item Popup Form */}
        {showAddForm && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add New Item</h3>
              <input type="text" placeholder="Item name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
              <input type="text" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
              <input type="text" placeholder="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
              <button className="save-btn" onClick={handleAdd}>Save</button>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Edit Item Popup Form */}
        {showEditForm && currentItem && (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit Item</h3>
              <input 
                type="text" 
                placeholder="Item name" 
                value={currentItem.name} 
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} 
              />
              <input 
                type="text" 
                placeholder="Price" 
                value={currentItem.price} 
                onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })} 
              />
              <input 
                type="text" 
                placeholder="Category" 
                value={currentItem.category} 
                onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })} 
              />
              <button className="save-btn" onClick={handleSaveEdit}>Save</button>
              <button className="close-btn" onClick={() => setShowEditForm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminControl;
