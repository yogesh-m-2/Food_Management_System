import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/staff/StaffLogin.css"; // Import the CSS file

const StaffLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      // Simulating successful login for staff
      navigate("/staff-dashboard");
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="staff-login-container">
      <h2>Staff Login</h2>
      <div className="login-box">
        <div className="tabs">
          <span className="active-tab">Login</span>
          <span className="inactive-tab">Signup</span>
        </div>
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

export default StaffLogin;
