import React, { useState, useEffect } from "react";
import "../../styles/admin/AdminControl.css";
import api from "../../services/api";

const timeSlots = ['morning', 'afternoon', 'evening', 'dinner'];
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturay'];

const AvailabilityMatrix = ({ availability = {}, onToggle }) => (
  <div className="availability-matrix">
    <table>
      <thead>
        <tr>
          <th>Day / Time</th>
          {timeSlots.map((slot) => (
            <th key={slot}>{slot}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((day) => (
          <tr key={day}>
            <td><strong>{day}</strong></td>
            {timeSlots.map((time) => (
              <td key={time}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={availability[day]?.includes(time) || false}
                    onChange={(e) => onToggle(day, time, e.target.checked)}
                  />
                  <span className="checkmark"></span>
                </label>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    // price: "",
    category: "",
    picture: "",
    description: "",
    available: true,
    // role: "",
    staffPrice: "",
    patientPrice: "",
    dietitianPrice: "",
    timeSlot: {}
  });
  // const [formData, setFormData] = useState({
  //   name: "D.MILK/SAGO FEED",
  //   category: "Liquid",
  //   picture: null,
  //   description: null,
  //   staffPrice: 12.0,
  //   patientPrice: 15.0,
  //   dietitianPrice: 12.0,
  //   combination: null,
  //   diet_type: "CKD",
  //   timeSlot: null,
  //   available: true,
  // });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await api.get("/menu-items");
      const originalData = response.data; // likely an array

      // Convert stringified timeSlot for each item
      const fixedData = originalData.map(item => ({
        ...item,
        timeSlot: typeof item.timeSlot === "string" ? JSON.parse(item.timeSlot) : item.timeSlot
      }));
      setMenuItems(fixedData);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleAdd = async () => {
    console.log(newItem)
    if (newItem.name && newItem.category) {
      const new_data_post = {
        ...newItem,
        timeSlot: JSON.stringify(newItem.timeSlot)
      };
      try {
        const response = await api.post("/menu-items", new_data_post);
        const item = response.data;
        
        const fixedItem = {
          ...item,
          timeSlot: typeof item.timeSlot === "string" ? JSON.parse(item.timeSlot) : item.timeSlot
        };
        
        setMenuItems([...menuItems, fixedItem]);
        setNewItem({
          name: "",
          category: "",
          picture: "",
          description: "",
          available: true,
          staffPrice: "",
          patientPrice: "",
          dietitianPrice: "",
          timeSlot: {}
        });
        setShowAddForm(false);
      } catch (error) {
        console.error("Error adding menu item:", error);
      }
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.delete(`/menu-items/${id}`);
      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowAddForm(true);
  };

  const handleAvailabilityToggle = (day, time, checked) => {
    if (editItem) {
      console.log("Value")
      console.log(day,time)
      const current = editItem.timeSlot[day] || [];
      const updated = checked
        ? [...new Set([...current, time])]
        : current.filter(t => t !== time);
        setEditItem({
        ...editItem,
        timeSlot: { 
          ...editItem.timeSlot, 
          [day]: updated 
        }
      });
    } else {
        const current = newItem.timeSlot[day] || [];
        const updated = checked
          ? [...new Set([...current, time])]
          : current.filter(t => t !== time);
          setNewItem({
          ...newItem,
          timeSlot: { 
            ...newItem.timeSlot, 
            [day]: updated 
          }
        });
    }
  };

  const handleUpdate = async () => {
      const new_data_post = {
        ...editItem,
        timeSlot: JSON.stringify(editItem.timeSlot)
      };
      console.log(new_data_post)
    if (editItem.name && editItem.category) {
      try {
        const response = await api.put(`/menu-items/${editItem.id}`, new_data_post);

        const item = response.data;
        const fixedItem = {
          ...item,
          timeSlot: typeof item.timeSlot === "string" ? JSON.parse(item.timeSlot) : item.timeSlot
        };

        setMenuItems(menuItems.map((item) => (item.id === editItem.id ? fixedItem : item)));
        setEditItem(null);
        setShowAddForm(false);
      } catch (error) {
        console.error("Error updating menu item:", error);
      }
    }
  };


  return (
    <div className="content">
      <button className="add-btn" onClick={() => {
        setShowAddForm(true)
        setEditItem(null)
      }}>
        Add Item
      </button>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Upload Picture</th>
            {/* <th>Price</th> */}
            <th>Category</th>
            {/* <th>Role</th> */}
            <th>Available</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                {item.picture ? (
                  <img src={item.picture} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                ) : (
                  "No Image"
                )}
              </td>
              {/* <td>{item.price}</td> */}
              <td>{item.category}</td>
              {/* <td>{item.role || "N/A"}</td> */}
              <td>{item.available ? "Yes" : "No"}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(item)}>✏️</button>
              </td>
              <td>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddForm && (
      <div className="modal">
      <div className="modal-content two-column">
        {/* Left: Form Section */}
        <div className="modal-left">
          <h3>{editItem ? "Edit Menu Item" : "Add New Item"}</h3>
    
          <input
            type="text"
            name="name"
            placeholder="Item name"
            value={editItem ? editItem.name : newItem.name}
            onChange={(e) =>
              editItem
                ? setEditItem({ ...editItem, name: e.target.value })
                : setNewItem({ ...newItem, name: e.target.value })
            }
          />
    
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={editItem ? editItem.category : newItem.category}
            onChange={(e) =>
              editItem
                ? setEditItem({ ...editItem, category: e.target.value })
                : setNewItem({ ...newItem, category: e.target.value })
            }
          />
    
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                const imageData = reader.result;
                editItem
                  ? setEditItem({ ...editItem, picture: imageData })
                  : setNewItem({ ...newItem, picture: imageData });
              };
              if (file) reader.readAsDataURL(file);
            }}
          />
    
          <label className="aval_label">
            <p>Available:</p>
            <input
              type="checkbox"
              checked={editItem ? editItem.available : newItem.available}
              onChange={(e) =>
                editItem
                  ? setEditItem({ ...editItem, available: e.target.checked })
                  : setNewItem({ ...newItem, available: e.target.checked })
              }
            />
          </label>
    
          <div className="price-inputs">
            <label>Staff Price</label>
            <input
              type="number"
              name="staffPrice"
              placeholder="Staff Price"
              value={editItem ? editItem.staffPrice : newItem.staffPrice}
              onChange={(e) =>
                editItem
                  ? setEditItem({ ...editItem, staffPrice: e.target.value })
                  : setNewItem({ ...newItem, staffPrice: e.target.value })
              }
            />
    
            <label>Patient Price</label>
            <input
              type="number"
              name="patientPrice"
              placeholder="Patient Price"
              value={editItem ? editItem.patientPrice : newItem.patientPrice}
              onChange={(e) =>
                editItem
                  ? setEditItem({ ...editItem, patientPrice: e.target.value })
                  : setNewItem({ ...newItem, patientPrice: e.target.value })
              }
            />
    
            <label>Dietitian Price</label>
            <input
              type="number"
              name="dietitianPrice"
              placeholder="Dietitian Price"
              value={editItem ? editItem.dietitianPrice : newItem.dietitianPrice}
              onChange={(e) =>
                editItem
                  ? setEditItem({ ...editItem, dietitianPrice: e.target.value })
                  : setNewItem({ ...newItem, dietitianPrice: e.target.value })
              }
            />
          </div>
    
          <div style={{ marginTop: '20px' }}>
            <button className="save-btn" onClick={editItem ? handleUpdate : handleAdd}>
              {editItem ? "Update" : "Save"}
            </button>
            <button className="close-btn" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </div>
    
        {/* Right: Matrix or Table Section */}
        <div className="modal-right">
          <h4>Availability Time Slot</h4>
          <AvailabilityMatrix
                    availability={editItem ? editItem.timeSlot : newItem.timeSlot}
                    onToggle={handleAvailabilityToggle}
                  />
        </div>
      </div>
    </div>
    
     
      )}
    </div>
  );
};

export default MenuManagement;
