import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ResetPassword.css"; // Import CSS file

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const { email } = useParams(); // Capture the email from the URL

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/reset-password/${email}`,
        { newPassword }
      );
      setMessage(response.data);
      setTimeout(() => {
        navigate("/UnifiedLogin"); // Redirect to login page after reset
      }, 2000); // Wait 2 seconds before redirecting
    } catch (error) {
      setMessage("Error: Unable to reset password.");
      console.error(error);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-header">
        <h2 className="reset-password-text">Reset Password</h2>
        <div className="reset-password-underline"></div>
      </div>

      <p className="reset-password-info">Reset Password for: <span>{email}</span></p>

      <form className="reset-password-inputs" onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
        <div className="reset-password-input">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="reset-password-input">
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="reset-password-submit-container">
          <button type="submit" className="reset-password-submit">Set New Password</button>
        </div>
      </form>

      {message && <p className="reset-password-message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
