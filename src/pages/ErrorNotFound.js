import React from "react";
import { Link } from "react-router-dom";
import "./ErrorNotFound.css"; 

const ErrorNotFound = () => {
  return (
    <div className="not-found-container">
      <div className="error-message">
      <img src="/bookowl_prev_ui.png" alt="Owl" className="owl" />
        <div className="speech-bubble">
          <p>Sorry, this page doesn't exist and is under development!</p>
        </div>
      </div>
      <Link to="/HomePage">
        <button className="home-button43">Return to Home</button>
      </Link>
    </div>
  );
};

export default ErrorNotFound;
