import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/kitchen/KitchenLogin.css"; // Updated CSS path

const KitchenLogin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
        alert("Please fill all fields");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      alert("Signup successful! You can now log in.");
      setIsSignup(false); // Switch back to login after signup
    } else {
      if (!username.trim() || !password.trim()) {
        alert("Please enter both username and password");
        return;
      }
      navigate("/kitchen-dashboard"); // Redirect after login
    }
  };

  return (
    <div className="kitchen-login-container">
      <h2>Kitchen LOGIN</h2>
      <div className="login-box">
        <div className="tabs">
          <span 
            className={!isSignup ? "active" : ""} 
            onClick={() => setIsSignup(false)}
          >
            Login
          </span>
          <span 
            className={isSignup ? "active" : ""} 
            onClick={() => setIsSignup(true)}
          >
            Signup
          </span>
        </div>

        <form onSubmit={handleSubmit}>
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

          {isSignup && (
            <>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm password"
              />
            </>
          )}

          <button type="submit">{isSignup ? "Signup" : "Login"}</button>
        </form>
      </div>
    </div>
  );
};

export default KitchenLogin;
