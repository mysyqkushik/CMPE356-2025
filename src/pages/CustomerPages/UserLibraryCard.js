import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserLibraryCard.css"; // Ensure this CSS file includes the flip animation styles

const UserLibraryCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [libraryID, setLibraryID] = useState("");
  const [message, setMessage] = useState("");

  const handleFrontSubmit = () => {
    if (firstName && lastName) {
      setIsFlipped(true);
    }
  };

  const handleBackSubmit = () => {
    if (libraryID) {
      setIsFlipped(false);
      setMessage("Your request has been submitted!");
    }
  };

  return (
    <div className="user-library-card-container123">
      <div className="card-wrapper123">
        <h1>Make your library card</h1>
        <div className={`card-container123 ${isFlipped ? "flipped123" : ""}`}>
          {/* Front Side */}
          <div className="card-front123">
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
            <button className="send-button123" onClick={handleFrontSubmit}>Next</button>
          </div>

          {/* Back Side */}
          <div className="card-back123">
            <h3>Set Your Library ID</h3>
            <label className="label123" htmlFor="libraryID">Library ID:</label>
            <input
              type="text"
              id="libraryID"
              className="input123"
              value={libraryID}
              onChange={(e) => setLibraryID(e.target.value)}
              placeholder="Enter a Library ID"
            />
            <button className="send-button123" onClick={handleBackSubmit}>Submit</button>
          </div>
        </div>
        {message && <p className="message123">{message}</p>}
        <div className="return-to-dashboard123">
          <Link to="/CustomerDashboard">
            <button className="return-button123">Return to Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLibraryCard;