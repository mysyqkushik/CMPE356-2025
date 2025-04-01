import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./UnifiedLogin.css";

const users = [
  { role: "admin", username: "admin123", email: "admin@example.com", password: "5678", dashboard: "/AdminDashboard" },
  { role: "manager", username: "manager123", email: "manager@example.com", password: "1234", dashboard: "/ManagerDashboard" },
];

const customerData = require("./ManagerPages/bookdata.json"); // Customer data

const UnifiedLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Check if user is admin or manager
    const user = users.find((u) => u.username === username && u.email === email && u.password === password);
    
    if (user) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate(user.dashboard);
      return;
    }

    // Check if user is a customer
    const customer = customerData.userslogin.find((c) => c.username === username && c.email === email);
    if (customer && customer.password === password) {
      localStorage.setItem("currentUser", JSON.stringify(customer));
      navigate("/CustomerDashboard");
      return;
    }

    setError("Invalid credentials. Please try again.");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
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
      {error && <div className="error">{error}</div>}
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

export default UnifiedLogin;
