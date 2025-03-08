import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserLibraryCard.css";  // Make sure you have a suitable CSS file

const UserLibraryCard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (firstName && lastName) {
      setMessage("Your request has been noted!");
    } else {
      setMessage("Please fill out both fields.");
    }
  };

  return (
    <div className="user-library-card-container123">
      <h1>Make your library card</h1>
      <div className="card123">
        <h3>Add your details</h3>
        <label className="label123" htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          className="input123"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
        />
        <label className="label123" htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          className="input123"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />
        <button className="send-button123" onClick={handleSubmit}>Send Request</button>
        {message && <p className="message123">{message}</p>}
      </div>
      <div className="return-to-dashboard123">
        <Link to="/CustomerDashboard">
          <button className="return-button123">Return to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default UserLibraryCard;
