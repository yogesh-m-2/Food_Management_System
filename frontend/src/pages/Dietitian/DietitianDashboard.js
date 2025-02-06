import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "../../styles/dietitian/DietitianDashboard.css";

const DietitianDashboard = () => {
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response = await api.get("/patient/floors");
        setFloors(response.data);
      } catch (error) {
        console.error("Error fetching floors:", error);
      }
    };
    fetchFloors();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dietitian Dashboard</h2>
      <div className="list-section">
        <h3>Floors</h3>
        {floors.map((floor) => (
          <Link key={floor} to={`/dietitian/wards/${floor}`} className="list-item">
            {floor}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DietitianDashboard;
