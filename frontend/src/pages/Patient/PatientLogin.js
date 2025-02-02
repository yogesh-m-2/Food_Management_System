import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/patient/patient.css"; // Import the CSS file

const PatientLogin = () => {
  const [uhid, setUhid] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (uhid.trim()) {
      // Simulating successful login for patient
      navigate("/dashboard");
    } else {
      alert("Please enter your UHID");
    }
  };

  return (
    <div className="patient-login-container">
      <h2>PATIENT LOGIN</h2>
      <div className="login-box">
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <label>UHID</label>
          <input
            type="text"
            value={uhid}
            onChange={(e) => setUhid(e.target.value)}
            required
            placeholder="Enter UHID"
            className="uhid-input"
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
