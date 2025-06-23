import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/dietitian/DietitianDashboard.css";
import { Hospital, ArrowLeft, Building2 } from "lucide-react";

const DietitianDashboard = () => {
  const [floors, setFloors] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response = await api.get("/patient/floors");
        setFloors(response.data);
      } catch (error) {
        console.error("Error fetching floors:", error);
      } finally {
        setLoading(false); // ← Set loading to false once done
      }
    };
    fetchFloors();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>
        <div className="header-title">
          <Hospital size={28} color="#4A90E2" />
          <h1>Dietitian Dashboard</h1>
        </div>
        <div className="right-placeholder" />
      </header>

      {loading ? (
        <div className="center-loading-message">Loading...</div>
      ) : (
        <section className="list-section">
          <div className="floor-grid">
            {floors.map((floor) => (
              <Link key={floor} to={`/dietitian/wards/${floor}`} className="floor-card">
                <Building2 size={20} />
                <span>Floor {floor}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default DietitianDashboard;
