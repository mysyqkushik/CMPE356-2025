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
  const [showRoleSelection, setShowRoleSelection] = useState(false); // state to handle role selection popup
  const [roles, setRoles] = useState([]); // state to store the user's roles

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
        setRoles(response.data.roles); // Store the user's roles

        // If the user has multiple roles, show the role selection popup
        if (response.data.roles.length > 1) {
          setShowRoleSelection(true);
        } else {
          // Otherwise, navigate to the appropriate dashboard directly
          handleRoleRedirect(response.data.roles[0]);
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error);
      setError("Server error. Please try again.");
    }
  };

  // Handle redirection based on the selected role
  const handleRoleRedirect = (role) => {
    switch (role) {
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
  };

  // Handle role selection from popup
  const handleRoleSelection = (role) => {
    setShowRoleSelection(false); // Close the role selection popup
    handleRoleRedirect(role); // Redirect based on selected role
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
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input">
          <img src="envelope.png" alt="Email Icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src="lock.png" alt="Password Icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="forgot-password">
        Forgot Password?{" "}
        <Link to="/ForgotPassword" style={{ textDecoration: "underline" }}>
          Click Here
        </Link>
      </div>
      <div className="submit-container">
        <button className="submit" onClick={handleLogin}>Login</button>
      </div>
      <div className="home-button-container">
        <Link to="/Homepage">
          <button className="home-button">Return to Homepage</button>
        </Link>
      </div>

      {/* Role selection popup */}
      {showRoleSelection && (
        <div className="role-selection-popup">
          <h3>Hi, {username}! Please select your role:</h3>
          {roles.map((role) => (
            <button key={role} onClick={() => handleRoleSelection(role)}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnifiedLogin;
