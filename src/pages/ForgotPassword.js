import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/forgot-password",
        { email }
      );
      // If the backend responds successfully, navigate to the reset password page
      if (response.data === "Password reset request received. Please enter your new password.") {
        navigate(`/reset-password/${email}`); // Redirect to reset password page with email in URL
      } else {
        setMessage(response.data); // Display error or success message from backend
      }
    } catch (error) {
      setMessage("Error: Unable to process your request.");
      console.error(error);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-header">
        <h2 className="forgot-password-text">Forgot Password</h2>
        <div className="forgot-password-underline"></div>
      </div>
      <div className="forgot-password-inputs">
        <div className="forgot-password-input">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="forgot-password-submit-container">
          <button className="forgot-password-submit" onClick={handleForgotPassword}>
            Reset Password
          </button>
        </div>
      </div>
      {message && <p className="forgot-password-message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
