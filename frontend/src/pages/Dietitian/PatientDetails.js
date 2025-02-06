import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/dietitian/PatientDetatils.css";

const PatientDetails = () => {
  const { floor, ward, room, bed } = useParams();
  const [patient, setPatient] = useState(null);
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
            <svg className="profile-icon" ></svg>
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
                <button className="btn-primary" onClick={() => navigate("/dietitian/create-diet", { 
                    state: { orderedUserId: patient.uhid, patientName: patient.name }})}>Create Diet</button>
                <button className="btn-primary" onClick={() => navigate("/dietitian/order-history", { 
                    state: { orderedUserId: patient.uhid, orderedRole: "Patient" }
                  })}>Check Diet History</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
