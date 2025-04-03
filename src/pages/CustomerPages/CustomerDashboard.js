import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [firstName, setFirstName] = useState(""); // Store first name

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      axios
        .get(`http://localhost:8080/api/users/profile/${loggedInUser.username}`)
        .then((response) => {
          setFirstName(response.data.first_name); // Fetch first_name
          setBorrowedBooks(response.data.borrowedBooks || []);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

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
              <Link to="/ErrorNotFound">Feedback</Link>
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
            <span>🔔</span>
            <span>📧</span>
          </div>
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
          <div className="card yellow">
            <h3>View Issued Books</h3>
            <ul>
              {borrowedBooks.length > 0 ? (
                borrowedBooks.map((book, index) => <li key={index}>{book}</li>)
              ) : (
                <li>No books borrowed</li>
              )}
            </ul>
          </div>
          <div className="card red">
            <a href="/RateABook">
              <h3>Rate a Book</h3>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerDashboard;
