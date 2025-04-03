import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role set to customer
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!firstName || !lastName || !username || !email || !password) {
      alert("All fields are required!");
      return;
    }

    // Prepare user details
    const userDetails = {
      firstName,
      lastName,
      username,
      email,
      password,
      role,  // Include the role selection
    };

    try {
      // Make POST request to backend (Spring Boot)
      const response = await axios.post('http://localhost:8080/api/users/signup', userDetails);

      // Check for success message
      if (response.data.message === "Sign-up successful!") {
        // Store user details in session storage
        sessionStorage.setItem('loggedInUser', JSON.stringify({
          username, 
          email, 
          role 
        }));

        // Redirect based on user role
        if (role === 'customer') {
          navigate('/CustomerDashboard');
        } else if (role === 'manager') {
          navigate('/ManagerDashboard');
        } else if (role === 'admin') {
          navigate('/AdminDashboard');
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit} className="inputs">
        <div className="input">
          <img src="user.png" alt="User Icon" />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input">
          <img src="user.png" alt="User Icon" />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
        <div className="input">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">Sign Up</button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="home-button-container">
        <Link to="/Homepage">
          <button className="home-button">Return to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
