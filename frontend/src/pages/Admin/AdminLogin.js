import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/AdminLogin.css"; // Import the CSS file
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/authenticate/admin", { username, password });
      if (response.data.jwt) {
        localStorage.setItem("jwtToken", response.data.jwt); // Save token
        
        await login();
        await navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Check your credentials.");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
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

export default AdminLogin;
