import React, { useState } from 'react';

const DashboardPage = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Pizza', price: 10 },
    { id: 2, name: 'Burger', price: 5 },
  ]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });

  const handleAddItem = () => {
    if (newItem.name && newItem.price) {
      const newMenuItem = {
        id: menuItems.length + 1,
        name: newItem.name,
        price: parseFloat(newItem.price),
      };
      setMenuItems([...menuItems, newMenuItem]);
      setNewItem({ name: '', price: '' });
    } else {
      alert('Please enter both name and price');
    }
  };

  const handleRemoveItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <div className="dashboard-container">
      <h2>Canteen Menu Management</h2>
      
      {/* Add Item Form */}
      <div>
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {/* Menu List */}
      <h3>Current Menu</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}{' '}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
