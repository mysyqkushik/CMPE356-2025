import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Predefined admin login details
  const correctUsername = "admin123";
  const correctEmail = "admin@example.com";
  const correctPassword = "5678";

  const handleLogin = () => {
    if (username === correctUsername && email === correctEmail && password === correctPassword) {
      sessionStorage.setItem("adminLoggedIn", "true"); // Store login state in temp storage
      navigate("/AdminDashboard"); // Redirect on successful login
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Admin Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src="user.png" alt="User Icon" />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input">
          <img src="envelope.png" alt="Email Icon" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src="lock.png" alt="Password Icon" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <div className="forgot-password">Forgot Password?<span> Click Here</span></div>
      <div className="submit-container">
        <button className="submit" onClick={handleLogin}>Login</button>
      </div>
      <div className="home-button-container">
        <Link to="/Homepage">
          <button className="home-button">Return to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
