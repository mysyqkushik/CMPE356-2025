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
  const [validationErrors, setValidationErrors] = useState({});
  const [showRoleSelection, setShowRoleSelection] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);

  const [roles, setRoles] = useState([]); 

  const validateForm = () => {
    const errors = {};
    
    // Username validation
    if (!username.trim()) {
      errors.username = "Field required";
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "Field required";
    } else if (!email.includes('@')) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      errors.password = "Field required";
    } else if (password.length < 3) {
      errors.password = "Password must be at least 3 characters long";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    // Clear previous errors
    setError("");
    setValidationErrors({});

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

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
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Server error. Please try again.");
      }
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
            className={validationErrors.username ? "error-input" : ""}
          />
          {validationErrors.username && (
            <div className="validation-error">{validationErrors.username}</div>
          )}
        </div>
        <div className="input">
          <img src="envelope.png" alt="Email Icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={validationErrors.email ? "error-input" : ""}
          />
          {validationErrors.email && (
            <div className="validation-error">{validationErrors.email}</div>
          )}
        </div>
        <div className="input">
          <img src="lock.png" alt="Password Icon" />
          <div className="password-input-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className={validationErrors.password ? "error-input" : ""}
  />
  <span
    className="toggle-password"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "😳" : "😌"}
  </span>
</div>

          {validationErrors.password && (
            <div className="validation-error">{validationErrors.password}</div>
          )}
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="forgot-password">
        Forgot Password?{" "}
        <Link to="/ForgotPassword" >
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
        <div className="role-selection-popup22">
          <h3>Hi, {username}! Please select your role:</h3>
          <div className="role-button-group">
          {roles.map((role) => (
            <button key={role} onClick={() => handleRoleSelection(role)}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedLogin;
