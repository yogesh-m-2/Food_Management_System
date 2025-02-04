import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/kitchen/KitchenLogin.css"; // Updated CSS path
import api from "../../services/api"; // Import your api module
import { useAuth } from "../../context/AuthContext"; // Auth context for handling login state

const KitchenLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Assuming login is a function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send the login request to /authenticate/kitchenuser
      const response = await api.post("/authenticate/kitchenuser", { username, password });
      
      // Check if the JWT token is returned
      if (response.data.jwt) {
        localStorage.setItem("jwtToken", response.data.jwt); // Store JWT token in local storage
        await login(); // Call login function to set user context or state
        await navigate("/kitchen/kitchen-dashboard"); // Redirect to kitchen dashboard upon successful login
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Check your credentials.");
    }
  };

  return (
    <div className="kitchen-login-container">
      <h2>Kitchen LOGIN</h2>
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

export default KitchenLogin;
