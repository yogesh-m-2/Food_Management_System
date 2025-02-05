import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/delivery/DeliveryLogin.css"; // Ensure correct CSS path
import api from "../../services/api"; // Import API handler
import { useAuth } from "../../context/AuthContext"; // Import auth context

const DeliveryLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Assuming you have login functionality in your context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send credentials to backend API for authentication
      const response = await api.post("/authenticate/deliveryuser", { username, password });

      // If authentication is successful and a JWT is returned
      if (response.data.jwt) {
        localStorage.setItem("jwtToken", response.data.jwt); // Store JWT in localStorage
        await login(); // Call the login method from AuthContext
        navigate("/delivery/delivery-dashboard"); // Redirect to the delivery dashboard
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Check your credentials.");
    }
  };

  return (
    <div className="delivery-login-container">
      <h2>Delivery Login</h2>
      <div className="login-box">
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryLogin;
