import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    // Get the user's borrowed books from bookdata.json (bookData)
    const bookData = JSON.parse(localStorage.getItem("bookData")); // Fetch from localStorage

    if (bookData && Array.isArray(bookData.booksBorrowed)) {
      const userBooks = bookData.booksBorrowed.filter(
        (book) => book.userId === currentUser.id
      );
      setBorrowedBooks(userBooks);
    }
  }, [currentUser.id]);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Welcome, {currentUser.username}</div> {/* Display username */}
        <nav>
          <ul>
            <li className="active">
              <span>🏠</span> My Dashboard
            </li>
            <li>
              <span>📚</span> Borrow Book
            </li>
            <li>
              <span>🔄</span> Return Book
            </li>
            <li>
              <span>📜</span> View Issued Books
            </li>
            <li>
              <span>⭐</span> Rate Books
            </li>
            <li><span>📊</span> <Link to="/HomePage">Log Out</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="navbar3">
          <div className="navbar-icons">
            <span>🔔</span>
            <span>📧</span>
            <img className="profile-pic" src="https://via.placeholder.com/40" alt="Profile" />
          </div>
        </header>

        <section className="dashboard-cards">
          <div>
            <Link to="/BorrowBook">
              <button className="card blue">
                <h3>Borrow a Book</h3>
              </button>
            </Link>
          </div>
          <div className="card green">
            <Link to="/ReturnBook">
              <h3>Return a Book</h3>
            </Link>
          </div>
          <div className="card yellow">
            <h3>View Issued Books</h3>
            <ul>
              {borrowedBooks.length > 0 ? (
                borrowedBooks.map((book, index) => (
                  <li key={index}>
                    {book.bookTitle} - Due: {book.dueDate}
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>
          <div className="card red">
            <h3>Rate a Book</h3>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerDashboard;
