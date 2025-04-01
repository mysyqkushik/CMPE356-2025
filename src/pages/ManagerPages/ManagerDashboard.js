import React, { useState, useEffect } from "react";
import "./ManagerDashboard.css";
import { Link } from "react-router-dom";
import LibraryData from "./LibraryData"; // Import data file
import axios from "axios";

const ManagerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usersCount, setUsersCount] = useState(0);
  const [userName, setUserName] = useState(""); // For storing the username

  // Fetch user details (including username) from the backend
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      axios.get(`http://localhost:8080/api/users/profile/${loggedInUser.username}`)
        .then(response => {
          setUserName(response.data.username); // Assuming 'username' is the field in the response
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

  // Click Handlers
  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  const getFilteredBooks = () => {
    if (!books.length) return [];
    switch (selectedCategory) {
      case "total":
        return books;
      case "borrowed":
        return books.filter(book => book.status === "borrowed");
      case "due":
        return books.filter(book => book.dueDate && new Date(book.dueDate) < new Date());
      case "new":
        return books.filter(book => new Date(book.publishedDate).getFullYear() > 2010);
      default:
        return [];
    }
  };

  const getBorrowerName = (bookId) => {
    const borrowedBook = books.find(book => book.id === bookId && book.status === "borrowed");
    return borrowedBook ? borrowedBook.borrower : "N/A";
  };

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
            <h2>Welcome, {userName ? userName : "Manager"}</h2>
          </div>
        </header>

        <section className="dashboard-cards">
          <div className="card blue" onClick={() => handleCardClick("total")}>
            <h3>Total Books in Library</h3>
            <p className="big-number">{totalBooks}</p>
          </div>
          <div className="card green" onClick={() => handleCardClick("borrowed")}>
            <h3>Books Currently Borrowed</h3>
            <p className="big-number">{booksBorrowed}</p>
          </div>
          <div className="card yellow" onClick={() => handleCardClick("due")}>
            <h3>Books Due for Return</h3>
            <p className="big-number">{overdueBooks}</p>
          </div>
          <div className="card red" onClick={() => handleCardClick("new")}>
            <h3>New Book Arrivals</h3>
            <p className="big-number">{newBooks}</p>
          </div>
          <div className="card purple" onClick={() => handleCardClick("users")}>
            <h3>View Users</h3>
            <p className="big-number">{users.length}</p>
          </div>
        </section>

        {selectedCategory && selectedCategory !== "users" && (
          <section className="filtered-books">
            <h3>
              {selectedCategory === "total" && "All Books"}
              {selectedCategory === "borrowed" && "Books Currently Borrowed"}
              {selectedCategory === "due" && "Overdue Books"}
              {selectedCategory === "new" && "New Book Arrivals"}
            </h3>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Borrower</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredBooks().map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.status}</td>
                    <td>{book.dueDate || "N/A"}</td>
                    <td>{getBorrowerName(book.id)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {selectedCategory === "users" && (
          <section className="users-list">
            <h3>All Users</h3>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
