import React, { useState, useEffect } from 'react';
import '../../styles/patient/patientorder.css';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const PatientOrder = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('south');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await api.get('/menu-items');
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };
        fetchMenuItems();
    }, []);

    const handleCheckout = () => {
        if (Object.keys(cartItems).length === 0) {
            alert("Your cart is empty!");
            return;
        }
        navigate('/patient/checkout', { state: { cartItems, menuItems } });
    };

    const handleAddToCart = (item) => {
        setCartItems((prevCart) => ({
            ...prevCart,
            [item.id]: (prevCart[item.id] || 0) + 1,
        }));
    };

    const handleIncrease = (itemId) => {
        setCartItems((prevCart) => ({
            ...prevCart,
            [itemId]: prevCart[itemId] + 1,
        }));
    };

    const handleDecrease = (itemId) => {
        setCartItems((prevCart) => {
            const newCart = { ...prevCart };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    const filteredMenuItems = menuItems.filter(item => item.category === selectedCategory);

    return (
        <div className="patient-order-container">
            <aside className="category-sidebar">
                <ul>
                    {['south', 'north', 'beverages', 'tiffin'].map(category => (
                        <li
                            key={category}
                            className={selectedCategory === category ? 'active' : ''}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="food-items-area">
                {filteredMenuItems.map(item => (
                    <div key={item.id} className="food-item">
                        <div className="image-placeholder">
                            {item.picture && <img src={item.picture} alt={item.name} />}
                        </div>
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Price: ₹{item.patientPrice}</p>

                            {cartItems[item.id] ? (
                                <div className="quantity-selector">
                                    <button onClick={() => handleDecrease(item.id)}>-</button>
                                    <span>{cartItems[item.id]}</span>
                                    <button onClick={() => handleIncrease(item.id)}>+</button>
                                </div>
                            ) : (
                                <button onClick={() => handleAddToCart(item)} disabled={!item.available}>
                                    {item.available ? 'ADD' : 'Unavailable'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </main>

            <aside className="checkout-sidebar">
                <h2>Cart</h2>
                <ul>
                    {Object.keys(cartItems).map(id => {
                        const item = menuItems.find(menuItem => menuItem.id === parseInt(id));
                        return (
                            <li key={id}>
                                {item.name} - {cartItems[id]} x ₹{item.patientPrice}
                            </li>
                        );
                    })}
                </ul>
                <button onClick={handleCheckout}>Checkout</button>
            </aside>
        </div>
    );
};

export default PatientOrder;