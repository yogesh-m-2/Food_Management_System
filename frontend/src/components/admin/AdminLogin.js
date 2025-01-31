import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/AdminLogin.css"; // Import the CSS file

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      // Simulating successful login for admin
      navigate("/dashboard");
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>ADMIN LOGIN</h2>
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
