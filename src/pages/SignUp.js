// Signup.js
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

  const handleSignup = async () => {
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
        // Save to sessionStorage
        sessionStorage.setItem("loggedInUser", JSON.stringify({ username }));
  
        // Navigate to role-specific dashboard
        const userRole = selectedRoles[0];
        if (userRole === "admin") {
          navigate("/AdminDashboard");
        } else if (userRole === "manager") {
          navigate("/ManagerDashboard");
        } else {
          navigate("/CustomerDashboard");
        }
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
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="input">
          <img src="user.png" alt="User Icon" />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
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

        {/* Role Selection Dropdown */}
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
