import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LibraryData from "../ManagerPages/LibraryData";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Retrieve current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (currentUser) {
      // Listen for changes in localStorage and update the borrowed books
      const handleStorageChange = () => {
        const updatedLibraryData = JSON.parse(localStorage.getItem("libraryData"));
        const user = updatedLibraryData?.userslogin?.find(
          (user) => user.username === currentUser.username
        );
        if (user) {
          setBorrowedBooks(user.borrowedBooks);
        }
      };

      window.addEventListener("storage", handleStorageChange);
      handleStorageChange(); // Initial load

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [currentUser]);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Welcome, {currentUser?.username}</div> {/* Display username */}
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
              <span>📜</span> Feedback
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
            <img className="profile-pic" src="https://via.placeholder.com/40" alt="Profile" />
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
                borrowedBooks.map((book, index) => (
                  <li key={index}>{book}</li>
                ))
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
