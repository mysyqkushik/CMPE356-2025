import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './CustomerLogin.css';
import bookData from './ManagerPages/bookdata.json'; // Direct import

const CustomerLogin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usersData, setUserData] = useState(bookData.userslogin); // Directly use the users data
  const navigate = useNavigate();

  // Handle login
  const handleLogin = () => {
    const user = usersData.find(
      (user) => user.username === username && user.email === email
    );

    if (user && user.password === password) {
      // Store the logged-in user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate("/CustomerDashboard"); // Navigate to the dashboard
    } else {
      setError("Invalid username, email, or password");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Customer Login</div>
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
      <div className="forgot-password">Forgot Password?<span> Click Here</span></div>
      <div className="submit-container">
        <button className="submit" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default CustomerLogin;
