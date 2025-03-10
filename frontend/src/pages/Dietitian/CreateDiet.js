import React, { useState, useEffect } from "react";
import "../../styles/dietitian/CreateDiet.css";
import api from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";

const CreateDiet = () => {
    const [dietItems, setDietItems] = useState([]);
    const [selectedDiets, setSelectedDiets] = useState({}); // Stores item quantities
    const [itemDateTime, setItemDateTime] = useState({}); // Stores date & time for each item
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState("Clear liquid");
    const { orderedUserId: stateOrderedUserId, patientName, dietDetails } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDietItems = async () => {
            try {
                const response = await api.get("/menu-items");
                setDietItems(response.data);
            } catch (error) {
                console.error("Error fetching diet items:", error);
            }
        };

        fetchDietItems();
    }, []);

    const handleCheckout = () => {
        let orderedUserId = stateOrderedUserId;
        if (Object.keys(selectedDiets).length === 0) {
            alert("No diet items selected!");
            return;
        }
        navigate("/dietitian/checkout", { state: { selectedDiets, dietItems, itemDateTime, orderedUserId, patientName } });
    };

    const handleAddToDiet = (item) => {
        setSelectedDiets((prevDiet) => ({
            ...prevDiet,
            [item.id]: (prevDiet[item.id] || 0) + 1, // Increment quantity
        }));
    };

    const handleIncrease = (itemId) => {
        setSelectedDiets((prevDiet) => ({
            ...prevDiet,
            [itemId]: prevDiet[itemId] + 1,
        }));
    };

    const handleDecrease = (itemId) => {
        setSelectedDiets((prevDiet) => {
            const newDiet = { ...prevDiet };
            if (newDiet[itemId] > 1) {
                newDiet[itemId] -= 1;
            } else {
                delete newDiet[itemId]; // Remove if quantity is 0
            }
            return newDiet;
        });
    };

    const handleDateTimeChange = (itemId, value) => {
        // Validate if the value is a valid date format, if not, return early
        const date = new Date(value);
        if (isNaN(date)) {
            alert("Invalid date format. Please select a valid date.");
            return;
        }

        setItemDateTime((prevDateTime) => ({
            ...prevDateTime,
            [itemId]: value, // store valid date-time string
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? "Invalid Date" : date.toLocaleString(); // Format date to local string if valid
    };

    const filteredDietItems = dietItems.filter(item => {
        const isDisliked = dietDetails.dislikes.some(dislike => 
            dislike.toLowerCase().trim() === item.name.toLowerCase().trim()
        );
    
        const isComboMatch = dietDetails.combo.includes(item.combination);
    
        return isComboMatch && !isDisliked;
    });

    return (
        <div className="diet-container">
            <aside className="diet-sidebar">
                <ul>
                    {["Clear liquid", "NORMAL", "DM", "ACITROM", "CKD", "CKD WITH DM"]
                        .map(category => (
                            <li
                                key={category}
                                className={selectedCategory === category ? "active" : ""}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                </ul>
            </aside>

            <main className="diet-items-area">
                {filteredDietItems.map(item => (
                    <div key={item.id} className="diet-item">
                        <div className="image-placeholder">
                            {item.picture && <img src={item.picture} alt={item.name} />}
                        </div>
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Calories: {item.calories}</p>

                            <label className="date-time-label">
                                Select Date & Time:
                                <input
                                    type="datetime-local"
                                    value={itemDateTime[item.id] || ""}
                                    onChange={(e) => handleDateTimeChange(item.id, e.target.value)}
                                />
                            </label>

                            {selectedDiets[item.id] ? (
                                <div className="quantity-selector">
                                    <button onClick={() => handleDecrease(item.id)}>-</button>
                                    <span>{selectedDiets[item.id]}</span>
                                    <button onClick={() => handleIncrease(item.id)}>+</button>
                                </div>
                            ) : (
                                <button onClick={() => handleAddToDiet(item)} disabled={!item.available}>
                                    {item.available ? "ADD" : "Unavailable"}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </main>

            <aside className="diet-checkout">
                <h2>Selected Diet</h2>
                <ul>
                    {Object.keys(selectedDiets).map(id => {
                        const item = dietItems.find(dietItem => dietItem.id === parseInt(id));
                        return (
                            <li key={id}>
                                {item.name} - {selectedDiets[id]} x {item.calories} cal
                                <br />
                                <small>{itemDateTime[id] ? `Time: ${formatDate(itemDateTime[id])}` : "No time set"}</small>
                            </li>
                        );
                    })}
                </ul>
                <button onClick={handleCheckout}>Proceed</button>
            </aside>
        </div>
    );
};

export default CreateDiet;
