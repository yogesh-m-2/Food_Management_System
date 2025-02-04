import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/delivery/DeliveryLogin.css"; // Ensure correct CSS path

const DeliveryLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password");
      return;
    }
    navigate("/delivery-dashboard"); // Redirect to dashboard after login
  };

  return (
    <div className="delivery-login-container">
      <h2>Delivery LOGIN</h2>
      <div className="login-box">
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryLogin;
