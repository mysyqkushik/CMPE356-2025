import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRoles, setSelectedRoles] = useState(["customer"]);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!firstName.trim()) errors.firstName = "Field required";
    if (!lastName.trim()) errors.lastName = "Field required";
    if (!username.trim()) errors.username = "Field required";

    if (!email.trim()) {
      errors.email = "Field required";
    } else if (!email.includes("@")) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Field required";
    } else if (password.length < 3) {
      errors.password = "Password must be at least 3 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async () => {
    setError("");
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8080/api/users/signup", {
        firstName,
        lastName,
        username,
        email,
        password,
        roles: selectedRoles
      });

      if (response.data.message === "User registered successfully!") {
        sessionStorage.setItem("loggedInUser", JSON.stringify({ username }));
        const userRole = selectedRoles[0];
        if (userRole === "admin") navigate("/AdminDashboard");
        else if (userRole === "manager") navigate("/ManagerDashboard");
        else navigate("/CustomerDashboard");
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Signup</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src="user.png" alt="User Icon" />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={validationErrors.firstName ? "error-input" : ""}
          />
          {validationErrors.firstName && <div className="validation-error">{validationErrors.firstName}</div>}
        </div>

        <div className="input">
          <img src="user.png" alt="User Icon" />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={validationErrors.lastName ? "error-input" : ""}
          />
          {validationErrors.lastName && <div className="validation-error">{validationErrors.lastName}</div>}
        </div>

        <div className="input">
          <img src="user.png" alt="User Icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={validationErrors.username ? "error-input" : ""}
          />
          {validationErrors.username && <div className="validation-error">{validationErrors.username}</div>}
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
          {validationErrors.email && <div className="validation-error">{validationErrors.email}</div>}
        </div>

        <div className="input">
          <img src="lock.png" alt="Password Icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={validationErrors.password ? "error-input" : ""}
          />
          {validationErrors.password && <div className="validation-error">{validationErrors.password}</div>}
        </div>

        {/* Role Selection */}
        <div className="selectrole1">
          <select value={selectedRoles[0]} onChange={(e) => setSelectedRoles([e.target.value])}>
            <option value="customer">Customer</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="submit-container">
        <button className="submit" onClick={handleSignup}>Sign Up</button>
      </div>

      <div className="home-button-container">
        <Link to="/Homepage">
          <button className="home-button">Return to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
