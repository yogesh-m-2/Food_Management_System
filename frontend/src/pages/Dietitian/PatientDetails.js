import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "../../styles/dietitian/PatientDetatils.css";
import { ArrowRight,ArrowLeft } from "lucide-react";


const PatientDetails = () => {
  const { floor, ward, room, bed } = useParams();
  const [patient, setPatient] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [combo, setCombo] = useState({ solid: false, "semi solid": false, liquid: false });
  const [allergies, setAllergies] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [newDislike, setNewDislike] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [roomDetails, setRoomDetails] = useState("");

  

  useEffect(() => {
    const fetchMenuCategories = async () => {
      try {
        const response = await api.get("/menu-items");
        const items = response.data;
  
        // Extract unique categories
        const uniqueCategories = [...new Set(items.map(item => item.category?.toLowerCase()))];
  
        setCategories(uniqueCategories);
  
        // Initialize combo checkboxes dynamically
        const initialCombo = {};
        uniqueCategories.forEach(cat => {
          initialCombo[cat] = false;
        });
        setCombo(initialCombo);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
  
    fetchMenuCategories();
  }, []);
  

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await api.get(`/patient/patients/${floor}/${ward}/${room}/${bed}`);
        setPatient(response.data[0]);
        const roomMsg = `Room No: ${response.data[0]?.roomNo || "N/A"}, Floor: ${response.data[0]?.floor || "N/A"}, Ward: ${response.data[0]?.ward || "N/A"}, Bed: ${response.data[0]?.bedNo || "N/A"}`;
        setRoomDetails(roomMsg);

      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    fetchPatient();
  }, [floor, ward, room, bed]);

  const handleComboChange = (e) => {
    setCombo({ ...combo, [e.target.name]: e.target.checked });
  };
  
  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const handleAddDislike = () => {
    if (newDislike.trim()) {
      setDislikes([...dislikes, newDislike.trim()]);
      setNewDislike("");
    }
  };

  const handleRemoveAllergy = (index) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const handleRemoveDislike = (index) => {
    setDislikes(dislikes.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    const selectedCombo = Object.keys(combo).filter(key => combo[key]);
    const dietDetails = {
      combo: selectedCombo,
      allergies,
      dislikes,
    };
    console.log(dietDetails); // Replace with actual submission logic
    setShowPopup(false);
    navigate("/dietitian/create-diet", { 
      state: { orderedUserId: patient.uhid, patientName: patient.name, dietDetails,patientMobileNumber : patient.patientMobileNo , patientdeliverydetails : roomDetails}});
  };

  if (!patient) {
    return (
      <div className="patient-loading-container">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }
  

  return (
    <div>
    <div className="patient-details-container">
    <div className="patient-info-wrapper">
  <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>
  <div className="patient-info-grid">
    {/* Left: Profile Image */}
    <div className="patient-profile-image">
      <div className="profile-placeholder">
        <svg className="profile-icon" /* your SVG icon here */ />
      </div>
    </div>

    {/* Right: Patient Info Card */}
    <div className="patient-info-card">
      <div className="patient-info-section">
        <div className="patient-info-details">
          {/* Patient details */}
          <p><span className="label">Name:</span> {patient.name || "N/A"}</p>
          <p><span className="label">UHID:</span> {patient.uhid || "N/A"}</p>
          <p><span className="label">Age:</span> {patient.age || "N/A"}</p>
          <p><span className="label">Gender:</span> {patient.gender || "N/A"}</p>
          <p><span className="label">Primary Consultant:</span> {patient.primaryConsultant || "N/A"}</p>
          <p><span className="label">Diagnosis Description:</span> {patient.diagnosisDescription || "N/A"}</p>
          <p><span className="label">Admission Date/Time:</span> {patient.admissionDateTime || "N/A"}</p>
          <p><span className="label">Discharge Date/Time:</span> {patient.dischargeDateTime || "N/A"}</p>
          <p><span className="label">Patient Status:</span> {patient.patientStatus || "N/A"}</p>
          <p><span className="label">Room No:</span> {patient.roomNo || "N/A"}</p>
          <p><span className="label">Floor:</span> {patient.floor || "N/A"}</p>
          <p><span className="label">Ward:</span> {patient.ward || "N/A"}</p>
          <p><span className="label">Bed:</span> {patient.bedNo || "N/A"}</p>
          <p><span className="label">Patient Mobile Number:</span> {patient.patientMobileNo || "N/A"}</p>
          <p><span className="label">Attender Mobile Number:</span> {patient.attendantContact || "N/A"}</p>
        </div>

        {/* Actions */}
        <div className="patient-actions">
          <button className="btn-primary" onClick={() => setShowPopup(true)}>Create Diet</button>
          <button
            className="btn-primary"
            onClick={() =>
              navigate("/dietitian/order-history", {
                state: { orderedUserId: patient.uhid, orderedRole: "Patient" },
              })
            }
          >
            Check Diet History
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Create Diet</h2>
            <div className="form-group">
              <label>Combo:</label>
              <div className="checkbox-group">
                {categories.map((category) => (
                  <div className="checkbox-item" key={category}>
                    <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
                    <input
                      type="checkbox"
                      name={category}
                      checked={combo[category] || false}
                      onChange={handleComboChange}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Allergies:</label>
              <div className="chip-container">
                {allergies.map((allergy, index) => (
                  <div key={index} className="chip">
                    {allergy}
                    <button className="chip-close" onClick={() => handleRemoveAllergy(index)}>x</button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value.toLowerCase())}
                placeholder="Add allergy"
              />
              <button onClick={handleAddAllergy}>Add Allergy</button>
            </div>
            <div className="form-group">
              <label>Dislikes:</label>
              <div className="chip-container">
                {dislikes.map((dislike, index) => (
                  <div key={index} className="chip">
                    {dislike}
                    <button className="chip-close" onClick={() => handleRemoveDislike(index)}>x</button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={newDislike}
                onChange={(e) => setNewDislike(e.target.value)}
                placeholder="Add dislike"
              />
              <button onClick={handleAddDislike}>Add Dislike</button>
            </div>
            <button className="btn-primary" onClick={handleSubmit}>Submit</button>
            <button className="btn-secondary" onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default PatientDetails;
