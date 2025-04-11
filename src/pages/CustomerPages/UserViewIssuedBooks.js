// InboxView.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserViewIssuedBooks.css";

const UserViewIssuedBooks = () => {
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = () => {
    if (!userId) {
      alert("Please enter your User ID.");
      return;
    }

    setLoading(true);

    axios.get(`http://localhost:8080/api/messages/received/${userId}`)
      .then(res => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching messages:", err);
        setLoading(false);
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
            <li><Link to="/UserLibraryCard">Message Admin</Link></li>
            <li><Link to="/UserViewIssuedBooks">View Messages</Link></li>
            <li><Link to="/CustomerDashboard">Return to Dashboard</Link></li>
          </ul>
        </div>
      </nav>

      <div className="issued-books-container1">
        <h2 className="message-title594">View My Messages</h2>

        <div className="input-group594">
          <label className="input-label594">Enter Your User ID:</label>
          <input
            type="number"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            className="input-field594"
          />
          <button
            onClick={fetchMessages}
            className="submit-button594"
          >
            View
          </button>
        </div>

        {loading && <p className="no-messages-text">Loading messages...</p>}

        {messages.length > 0 && (
          <div className="mt-6">
            <h3 className="message-title594">🗂️ Your Inbox</h3>
            <table className="issued-books-container1">
              <thead>
                <tr>
                  <th>From User ID</th>
                  <th>Message</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, idx) => (
                  <tr key={idx}>
                    <td>{msg.fromUserId}</td>
                    <td>{msg.message}</td>
                    <td>{new Date(msg.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && messages.length === 0 && (
          <p className="no-messages-text">No messages yet.</p>
        )}
      </div>
    </>
  );
};

export default UserViewIssuedBooks;
