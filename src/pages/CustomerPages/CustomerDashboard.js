import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CustomerDashboard.css";
import { toast } from "react-toastify";


const NotificationBell = ({ userId }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const fetchUnreadCount = () => {
    if (userId) {
      axios
        .get(`http://localhost:8080/api/messages/unread-count/${userId}`)
        .then((res) => setUnreadCount(res.data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, [userId]);

  const handleBellClick = (e) => {
    e.stopPropagation();
    setShowTooltip(!showTooltip);
  };

  const handleMarkAsRead = async (e) => {
    e.stopPropagation();
    if (unreadCount > 0) {
      try {
        await axios.put(`http://localhost:8080/api/messages/mark-read/${userId}`);
        setUnreadCount(0);
        toast.success("Notifications marked as read!");
      } catch (err) {
        console.error("Failed to mark messages as read:", err);
        toast.error("Failed to update notifications.");
      }
    }
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showTooltip && !e.target.closest('.notification-bell-wrapper')) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showTooltip]);

  return (
    <div className="notification-bell-wrapper">
      <div 
        className="notification-bell" 
        onClick={handleBellClick}
      >
        <span role="img" aria-label="bell" className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="unread-count">
            {unreadCount}
          </span>
        )}
      </div>
      
      {showTooltip && (
        <div className="notification-tooltip">
          {unreadCount > 0 ? (
            <>
              <div className="notification-message">
                You have {unreadCount} unread message(s)
              </div>
              <div className="notification-actions">
                <Link to="/UserViewIssuedBooks" className="view-messages-link">
                  View Messages
                </Link>
                <button onClick={handleMarkAsRead} className="mark-read-link">
                  Mark as Read
                </button>
              </div>
            </>
          ) : (
            <div className="notification-message">
              No new notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
};


const CustomerDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [userId, setUserId] = useState("");
  const [isIssuedBooksVisible, setIsIssuedBooksVisible] = useState(false);

  

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      axios
        .get(`http://localhost:8080/api/users/profile/${loggedInUser.username}`)
        .then((response) => {
          setFirstName(response.data.first_name);
          setUserId(response.data.id);
        })
        .catch((error) => console.error("Error fetching user profile:", error));

      axios
        .get(`http://localhost:8080/api/borrow/username/${loggedInUser.username}`)
        .then((response) => {
          setBorrowedBooks(response.data || []);
        })
        .catch((error) => console.error("Error fetching borrowed books:", error));
    }
  }, []);

  const toggleIssuedBooks = () => {
    setIsIssuedBooksVisible(!isIssuedBooksVisible);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Welcome, {firstName ? firstName : "User"}!</div>
        <nav>
          <ul>
            <li className="active"><span>🏠</span> My Dashboard</li>
            <li><span>📚</span><Link to="/UserDetails">My User Details</Link></li>
            <li><span>📜</span><Link to="/UserLibraryCard">Send Feedback</Link></li>
            <li><span>📊</span><a href="/HomePage">Log Out</a></li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="navbar3">
          <div className="navbar-icons">
            <NotificationBell userId={userId} />
            <div className="icon-with-tooltip">
              <span role="img" aria-label="email">📧</span>
              <div className="tooltip">No emails yet!</div>
            </div>
          </div>
          <div className="user-id-display">Your user ID is: {userId}</div>
        </header>

        <section className="dashboard-cards">
          <div>
            <a href="/BorrowBook">
              <button className="card blue">
                <h3>Borrow a Book</h3>
              </button>
            </a>
          </div>
          <button className="card green">
            <a href="/ReturnBook">
              <h3>Return a Book</h3>
            </a>
          </button>
          <div className="card yellow" onClick={toggleIssuedBooks}>
            <h3>View Issued Books</h3>
          </div>
          <div className="card red">
            <a href="/RateABook">
              <h3>Rate a Book</h3>
            </a>
          </div>
        </section>

        {isIssuedBooksVisible && (
          <section className="issued-books-section">
            <h2>Issued Books</h2>
            {borrowedBooks.length > 0 ? (
              <table className="borrowed-books-table">
                <thead>
                  <tr>
                    <th>Book ID</th>
                    <th>Title</th>
                    <th>Borrow Date</th>
                    <th>Return Date</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.map((book, index) => (
                    <tr key={index}>
                      <td>{book.bookId}</td>
                      <td>{book.bookTitle}</td>
                      <td>{new Date(book.borrowDate).toLocaleDateString()}</td>
                      <td>{new Date(book.returnDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No books borrowed</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
  
};

export default CustomerDashboard;
