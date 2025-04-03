import React, { useState, useEffect } from "react";
import "./ManagerDashboard.css";
import { Link } from "react-router-dom";
import LibraryData from "./LibraryData";
import axios from "axios";

const ManagerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usersCount, setUsersCount] = useState(0);
  const [firstName, setFirstName] = useState(""); // Store first name

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      axios.get(`http://localhost:8080/api/users/profile/${loggedInUser.username}`)
        .then(response => {
          setFirstName(response.data.first_name); // Fetch first_name
        })
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, []);

  useEffect(() => {
    fetch("/api/users/count")
      .then((res) => res.json())
      .then((data) => setUsersCount(data.count));
  }, []);

  useEffect(() => {
    if (LibraryData && LibraryData.books && LibraryData.users) {
      console.log("Library Data Loaded:", LibraryData);
      setBooks([...LibraryData.books]);
      setUsers([...LibraryData.users]);
    } else {
      console.error("LibraryData is not properly loaded");
    }
  }, []);

  // Book Statistics
  const totalBooks = books.length;
  const booksBorrowed = books.filter(book => book.status === "borrowed").length;
  const overdueBooks = books.filter(book => book.dueDate && new Date(book.dueDate) < new Date()).length;
  const newBooks = books.filter(book => new Date(book.publishedDate).getFullYear() > 2010).length;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Manager Dashboard</div>
        <nav>
          <ul>
            <li className="active"><span>🏠</span> Statistics Panel</li>
            <li><span>📦</span> <Link to="/ManageBooks">Book Inventory</Link></li>
            <li><span>👥</span> <Link to="/MUserDetails">My User Details</Link></li>
            <li><span>📊</span> <Link to="/HomePage">Log Out</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="navbar3">
          <div className="navbar-icons">
            <span>🔔</span>
            <span>📧</span>
          </div>
          <div className="welcome-message">
            <h2>Welcome, {firstName ? firstName : "Manager"}!</h2>
          </div>
        </header>

        <section className="dashboard-cards">
          <div className="card blue">
            <h3>Total Books in Library</h3>
            <p className="big-number">{totalBooks}</p>
          </div>
          <div className="card green">
            <h3>Books Currently Borrowed</h3>
            <p className="big-number">{booksBorrowed}</p>
          </div>
          <div className="card yellow">
            <h3>Books Due for Return</h3>
            <p className="big-number">{overdueBooks}</p>
          </div>
          <div className="card red">
            <h3>New Book Arrivals</h3>
            <p className="big-number">{newBooks}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagerDashboard;
