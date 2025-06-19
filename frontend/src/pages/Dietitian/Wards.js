import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import { ArrowRight } from "lucide-react";

const Wards = () => {
  const { floor } = useParams();
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await api.get(`/patient/wards/${floor}`);
        setWards(response.data);
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };
    fetchWards();
  }, [floor]);

  return (
    <div className="dashboard-container">
           <div className="wonder-nav">
        <Link to="/dietitian/dietitian-dashboard" className="wonder-link">Floor</Link>
        <ArrowRight className="nav-icon" />
        <Link to={`/dietitian/wards/${floor}`} className="wonder-link">Ward</Link>
      </div>
    <div className="list-section">
      <h3>Wards in {floor}</h3>
      {wards.map((ward) => (
        <Link key={ward} to={`/dietitian/rooms/${floor}/${ward}`} className="list-item">
          {ward}
        </Link>
      ))}
    </div>
    </div>
  );
};

export default Wards;
