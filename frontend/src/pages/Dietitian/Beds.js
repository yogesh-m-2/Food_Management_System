import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ArrowLeft, ArrowRight, Bed } from "lucide-react";
import "../../styles/dietitian/DietitianDashboard.css";

const Beds = () => {
  const { floor, ward, room } = useParams();
  const [beds, setBeds] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await api.get(`/patient/beds/${floor}/${ward}/${room}`);
        setBeds(response.data);
      } catch (error) {
        console.error("Error fetching beds:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchBeds();
  }, [floor, ward, room]);
  

  return (
    <div className="dashboard-container">
      {/* Header with back and title */}
      <header className="dashboard-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="header-title logo-area">
          <Bed size={30} color="#4A90E2" />
          <h1>Beds - Room {room}</h1>
        </div>

        <div className="right-placeholder" />
      </header>

      {/* Bed Cards */}
      {loading ? (
        <div className="center-loading-message">Loading...</div>
      ) : beds.length > 0 ? (
        <div className="floor-grid">
          {beds.map((bed) => (
            <Link
              key={bed}
              to={`/dietitian/patient/${floor}/${ward}/${room}/${bed}`}
              className="floor-card"
            >
              <Bed size={24} color="#2E86C1" />
              <span>Bed {bed}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="center-loading-message">No beds available.</div>
      )}

    </div>
  );
};

export default Beds;
