import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [firstName, setFirstName] = useState(""); // Store first name
  const [userId, setUserId] = useState(""); // Store user ID
  const [isIssuedBooksVisible, setIsIssuedBooksVisible] = useState(false); // Toggle visibility

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      // Fetch user profile data including ID
      axios
        .get(`http://localhost:8080/api/users/profile/${loggedInUser.username}`)
        .then((response) => {
          setFirstName(response.data.first_name);
          setUserId(response.data.id);
        })
        .catch((error) => console.error("Error fetching user profile:", error));

      // Fetch borrowed books
      axios
        .get(`http://localhost:8080/api/borrow/username/${loggedInUser.username}`)
        .then((response) => {
          setBorrowedBooks(response.data || []);
        })
        .catch((error) => console.error("Error fetching user data:", error));
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
            <li className="active">
              <span>🏠</span> My Dashboard
            </li>
            <li>
              <span>📚</span>
              <Link to="/UserLibraryCard">My Library Card</Link>
            </li>
            <li>
              <span>🔄</span>
              <Link to="/UserDetails">My User Details</Link>
            </li>
            <li>
              <span>📜</span>
              <Link to="/BorrowBook">Feedback</Link>
            </li>
            <li>
              <span>📊</span>
              <a href="/HomePage">Log Out</a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="navbar3">
          <div className="navbar-icons">
            <div className="icon-with-tooltip">
              <span role="img" aria-label="bell">🔔</span>
              <div className="tooltip">
                <div>No</div>
                <div>Notifications!</div>
              </div>
            </div>
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
          <div
            className="card yellow"
            onClick={toggleIssuedBooks} // Toggle the issued books section
          >
            <h3>View Issued Books</h3>
          </div>
          <div className="card red">
            <a href="/RateABook">
              <h3>Rate a Book</h3>
            </a>
          </div>
        </section>

        {/* Conditionally render the borrowed books table */}
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

