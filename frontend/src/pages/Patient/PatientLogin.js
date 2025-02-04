import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/patient/patient.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const PatientLogin = () => {
  const [uhid, setUhid] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/authenticate/patient", { uhid });
      if (response.data.jwt) {
        localStorage.setItem("jwtToken", response.data.jwt);
        await login();
        navigate("/patient/order");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Please check your UHID.");
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
