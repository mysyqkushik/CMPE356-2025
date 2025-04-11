import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserLibraryCard.css";

const UserLibraryCard = () => {
  const [message, setMessage] = useState("");
  const [fromUserId, setFromUserId] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!message.trim() || !fromUserId.trim()) {
      setError("Please enter both your User ID and a message.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        fromUserId: parseInt(fromUserId),
        toUserId: 1, // Admin ID fixed
        message: message.trim(),
      };

      await axios.post("http://localhost:8080/api/messages/send", payload);

      setConfirmation("✅ Message sent to Admin successfully!");
      setMessage("");
      setFromUserId("");

      setTimeout(() => setConfirmation(""), 3000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(err.response?.data?.error || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="managebar629">
        <div className="managebar-container629">
          <div className="managebar-brand629">
            <img src="bookowl_prev_ui.png" alt="Owl Logo" className="managebar-owl629" />
            <Link to="/HomePage" className="managebar-title629">
              THE<br />
              BOOK<br />
              OWL
            </Link>
          </div>
          <ul className="managebar-links629">
            <li><Link to="/UserLibraryCard">Message Admin</Link></li>
            <li><Link to="/UserViewIssuedBooks">View Messages</Link></li>
            <li><Link to="/CustomerDashboard">Return to Dashboard</Link></li>
          </ul>
        </div>
      </nav>

      <div className="message-container594">
        <h2 className="message-title594">Message Admin</h2>
  
        {error && (
          <div className="error-box594">
            {error}
          </div>
        )}
  
        <div className="input-group594">
          <label className="input-label594">
            Your User ID
          </label>
          <input
            type="number"
            className="input-field594"
            placeholder="Enter your user ID..."
            value={fromUserId}
            onChange={(e) => setFromUserId(e.target.value)}
            disabled={loading}
          />
        </div>
  
        <div className="input-group594">
          <label className="input-label594">
            Message to Admin (ID: 1)
          </label>
          <textarea
            className="textarea-field594"
            placeholder="Type your message..."
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
        </div>
  
        <button
          onClick={handleSend}
          disabled={loading}
          className={`submit-button594 ${loading ? "submit-disabled594" : ""}`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
  
        {confirmation && (
          <div className="confirmation-box594">
            {confirmation}
          </div>
        )}
      </div>
    </>
  );
}  

export default UserLibraryCard;
