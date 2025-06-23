import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ArrowLeft, ArrowRight, DoorOpen } from "lucide-react";
import "../../styles/dietitian/DietitianDashboard.css";

const Rooms = () => {
  const { floor, ward } = useParams();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get(`/patient/rooms/${floor}/${ward}`);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false); // Always stop loading after attempt
      }
    };
    fetchRooms();
  }, [floor, ward]);
  

  return (
    <div className="dashboard-container">
      {/* Header with back and title */}
      <header className="dashboard-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="header-title logo-area">
          <DoorOpen size={30} color="#4A90E2" />
          <h1>Rooms - Ward {ward}</h1>
        </div>

        <div className="right-placeholder" />
      </header>

      {/* Room Cards Grid */}
      {loading ? (
        <div className="center-loading-message">Loading...</div>
      ) : rooms.length > 0 ? (
        <div className="floor-grid">
          {rooms.map((room) => (
            <Link
              key={room}
              to={`/dietitian/beds/${floor}/${ward}/${room}`}
              className="floor-card"
            >
              <DoorOpen size={24} color="#2E86C1" />
              <span>Room {room}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="center-loading-message">No rooms available.</div>
      )}

    </div>
  );
};

export default Rooms;
