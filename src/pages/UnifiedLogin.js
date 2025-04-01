import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./UnifiedLogin.css";
import axios from "axios"; 

const UnifiedLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { email, password }, // ❌ Remove username from request
        { headers: { "Content-Type": "application/json" } } // ✅ Ensure proper headers
      );
  
      console.log("API Response:", response.data); // ✅ Debug response
  
      if (response.data.message === "Login successful!") {
        sessionStorage.setItem("loggedInUser", JSON.stringify(response.data));
  
        switch (response.data.role) {
          case "customer":
            navigate("/CustomerDashboard");
            break;
          case "manager":
            navigate("/ManagerDashboard");
            break;
          case "admin":
            navigate("/AdminDashboard");
            break;
          default:
            setError("Unknown role");
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error);
      setError("Server error. Please try again.");
    }
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
          <input type="user" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
