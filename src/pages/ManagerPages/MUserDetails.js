// this is AdminMessageSender.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MUserDetails.css";

const MUserDetails = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [message, setMessage] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    // Fetch all users except admin (ID 1)
    axios.get("http://localhost:8080/api/users/all-except-admin")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const handleSend = () => {
    if (!selectedUserId || !message.trim()) {
      alert("Please select a user and enter a message.");
      return;
    }

    const payload = {
      fromUserId: 1,  // Admin ID is 1
      toUserId: selectedUserId,
      message: message
    };

    axios.post("http://localhost:8080/api/messages/send", payload)
      .then(() => {
        setConfirmation("✅ Message sent!");
        setMessage("");
        setSelectedUserId("");
        setTimeout(() => setConfirmation(""), 3000);
      })
      .catch(err => {
        console.error("Failed to send message:", err);
        setConfirmation("❌ Failed to send message.");
      });
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
            <li><Link to="/MUserDetails">Send Messages</Link></li>
            <li><Link to="/ViewIssuedBooks">View Messages</Link></li>
            <li><Link to="/AdminDashboard">Return to Dashboard</Link></li>
          </ul>
        </div>
      </nav>

      <div className="m-user-details-container629">
        <h2 className="m-user-details-title629">Send Message to User</h2>

        <label className="m-user-details-label629">Select User</label>
        <select
          className="m-user-details-select629"
          value={selectedUserId}
          onChange={e => setSelectedUserId(e.target.value)}
        >
          <option value="">-- Select a user --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name || `User ${user.id}`} (ID: {user.id})
            </option>
          ))}
        </select>

        <label className="m-user-details-label629">Message</label>
        <textarea
          className="m-user-details-textarea629"
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="m-user-details-button629"
        >
          Send Message
        </button>

        {confirmation && (
          <div className="m-user-details-confirmation629">{confirmation}</div>
        )}
      </div>
    </>
  );
};

export default MUserDetails;
