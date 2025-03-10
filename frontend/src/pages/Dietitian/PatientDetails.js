import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/dietitian/PatientDetatils.css";

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

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await api.get(`/patient/patients/${floor}/${ward}/${room}/${bed}`);
        setPatient(response.data[0]);
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
      state: { orderedUserId: patient.uhid, patientName: patient.name, dietDetails }});
  };

  if (!patient) {
    return (
      <div className="patient-loading-container">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="patient-details-container">
      <div className="patient-info-wrapper">
        {/* Profile Image */}
        <div className="patient-profile-image">
          <div className="profile-placeholder">
            <svg className="profile-icon"></svg>
          </div>
        </div>

        {/* Patient Information */}
        <div className="patient-info-card">
          <div className="patient-info-grid">
            <div className="patient-info-section">
              <div className="patient-info-details">
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
                <p><span className="label">Patient Mobile Number:</span> {patient.patientMobileNo || "N/A"}</p>
                <p><span className="label">Attender Mobile Number:</span> {patient.attendantContact || "N/A"}</p>
              </div>
              <div className="patient-actions">
                <button className="btn-primary" onClick={() => setShowPopup(true)}>Create Diet</button>
                <button className="btn-primary" onClick={() => navigate("/dietitian/order-history", { 
                    state: { orderedUserId: patient.uhid, orderedRole: "Patient" }
                  })}>Check Diet History</button>
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
              <div>
                <label>
                  <input type="checkbox" name="solid" checked={combo.solid} onChange={handleComboChange} />
                  Solid
                </label>
                <label>
                  <input type="checkbox" name="semi solid" checked={combo["semi solid"]} onChange={handleComboChange} />
                  Semi Solid
                </label>
                <label>
                  <input type="checkbox" name="liquid" checked={combo.liquid} onChange={handleComboChange} />
                  Liquid
                </label>
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
                onChange={(e) => setNewAllergy(e.target.value)}
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
  );
};

export default PatientDetails;
