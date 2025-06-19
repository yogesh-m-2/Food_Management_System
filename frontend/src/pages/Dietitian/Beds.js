import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import { ArrowRight } from "lucide-react";

const Beds = () => {
  const { floor, ward, room } = useParams();
  const [beds, setBeds] = useState([]);

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await api.get(`/patient/beds/${floor}/${ward}/${room}`);
        setBeds(response.data);
      } catch (error) {
        console.error("Error fetching beds:", error);
      }
    };
    fetchBeds();
  }, [floor, ward, room]);

  return (
    <div className="dashboard-container">
    <div className="wonder-nav">
        <Link to="/dietitian/dietitian-dashboard" className="wonder-link">Floor</Link>
        <ArrowRight className="nav-icon" />
        <Link to={`/dietitian/wards/${floor}`} className="wonder-link">Ward</Link>
        <ArrowRight className="nav-icon" />
        <Link to={`/dietitian/rooms/${floor}/${ward}`} className="wonder-link">Rooms</Link>
        <ArrowRight className="nav-icon" />
        <Link to={`/dietitian/beds/${floor}/${ward}/${room}`} className="wonder-link">Beds</Link>
      </div>
    <div className="list-section">
      <h3>Beds in {room}</h3>
      {beds.map((bed) => (
        <Link key={bed} to={`/dietitian/patient/${floor}/${ward}/${room}/${bed}`} className="list-item">
          {bed}
        </Link>
      ))}
    </div>
  </div>
  );
};

export default Beds;
