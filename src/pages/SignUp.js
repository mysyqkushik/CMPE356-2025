import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const userDetails = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    // Store user details in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userDetails));

    // Redirect to CustomerDashboard
    navigate('/CustomerDashboard');
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
        <div className="submit-container">
          <button type="submit" className="submit">Sign Up</button>
        </div>
      </form>

      <div className="home-button-container">
        <Link to="/Homepage">
          <button className="home-button">Return to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
