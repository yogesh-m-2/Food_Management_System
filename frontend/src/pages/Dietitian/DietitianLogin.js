import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dietitian/DietitianLogin.css"; // Import CSS
import api from "../../services/api"; // Assuming you have a service file for API requests
import { useAuth } from "../../context/AuthContext"; // Assuming AuthContext is used for authentication

const DietitianLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/authenticate/dietitian", { username, password });
      if (response.data.jwt) {
        localStorage.setItem("jwtToken", response.data.jwt);
        await login();
        await navigate("/dietitian/dietitian-dashboard"); // Redirect after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Check your credentials.");
    }
  };

  return (
    <div className="dietitian-login-container">
      <h2>Dietitian Login</h2>
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

export default DietitianLogin;
