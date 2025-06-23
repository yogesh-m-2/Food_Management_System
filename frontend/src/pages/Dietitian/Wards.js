import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ArrowLeft, Stethoscope, BedDouble } from "lucide-react"; // Add icon
import "../../styles/dietitian/DietitianDashboard.css";

const Wards = () => {
  const { floor } = useParams();
  const [wards, setWards] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await api.get(`/patient/wards/${floor}`);
        setWards(response.data);
      } catch (error) {
        console.error("Error fetching wards:", error);
      } finally {
        setLoading(false); // Set loading to false once done
      }
    };
    fetchWards();
  }, [floor]);
  

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="header-title logo-area">
          <div className="logo-icon">
            <Stethoscope size={32} color="#4A90E2" />
          </div>
          <h1>Wards - Floor {floor}</h1>
        </div>

        <div className="right-placeholder" />
      </header>

      {loading ? (
  <div className="center-loading-message">Loading...</div>
) : wards.length > 0 ? (
  <div className="floor-grid">
    {wards.map((ward) => (
      <Link
        key={ward}
        to={`/dietitian/rooms/${floor}/${ward}`}
        className="floor-card"
      >
        <BedDouble size={24} color="#2E86C1" />
        <span>Ward {ward}</span>
      </Link>
    ))}
  </div>
) : (
  <div className="center-loading-message">No wards available.</div>
)}

    </div>
  );
};

export default Wards;
