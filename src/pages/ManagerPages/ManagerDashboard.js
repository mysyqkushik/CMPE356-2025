import React, { useState, useEffect } from "react";
import "./ManagerDashboard.css";

const defaultBooks = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedDate: "1925-04-10", quantity: 5, status: "available", category: "Classic", dueDate: null },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", publishedDate: "1960-07-11", quantity: 8, status: "borrowed", category: "Fiction", dueDate: "2025-03-01" },
  { id: 3, title: "1984", author: "George Orwell", publishedDate: "1949-06-08", quantity: 4, status: "available", category: "Dystopian", dueDate: null },
  { id: 4, title: "Moby-Dick", author: "Herman Melville", publishedDate: "1851-10-18", quantity: 3, status: "borrowed", category: "Adventure", dueDate: "2025-03-04" },
  { id: 5, title: "Pride and Prejudice", author: "Jane Austen", publishedDate: "1813-01-28", quantity: 6, status: "available", category: "Romance", dueDate: null },
];

const defaultUsers = [
  { name: "Harry Potter", active: true, borrowedBooks: ["To Kill a Mockingbird"] },
  { name: "Hermione Granger", active: true, borrowedBooks: [] },
  { name: "Ron Weasley", active: false, borrowedBooks: [] },
  { name: "Draco Malfoy", active: true, borrowedBooks: ["Moby-Dick"] },
  { name: "Luna Lovegood", active: true, borrowedBooks: [] },
  { name: "Neville Longbottom", active: false, borrowedBooks: [] },
  { name: "Ginny Weasley", active: true, borrowedBooks: [] },
  { name: "Albus Dumbledore", active: true, borrowedBooks: [] },
  { name: "Severus Snape", active: false, borrowedBooks: [] },
];

const ManagerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load books from localStorage, or use defaultBooks if none found
    const storedBooks = JSON.parse(localStorage.getItem("books")) || defaultBooks;
    const storedUsers = JSON.parse(localStorage.getItem("users")) || defaultUsers;
    
    setBooks(storedBooks);
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    // Save books and users to localStorage whenever they change
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("users", JSON.stringify(users));
  }, [books, users]);

  // Book Statistics
  const totalBooks = books.length;
  const booksBorrowed = books.filter(book => book.status === "borrowed").length;
  const overdueBooks = books.filter(book => book.dueDate && new Date(book.dueDate) < new Date()).length;
  const newBooks = books.filter(book => !book.dueDate).length;

  // Book Categories
  const bookCategories = books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {});

  // Active Users
  const activeUsers = users.filter(user => user.active).length;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Library Dashboard</div>
        <nav>
          <ul>
            <li className="active"><span>🏠</span> Dashboard</li>
            <li><span>📦</span> Book Inventory</li>
            <li><span>🔒</span> User Management</li>
            <li><span>📊</span> Analytics</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="navbar3">
          <div className="navbar-icons">
            <span>🔔</span>
            <span>📧</span>
            <img className="profile-pic" src="https://via.placeholder.com/40" alt="Profile" />
          </div>
        </header>

        {/* Dashboard Cards */}
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

        {/* Book Categories */}
        <section className="dashboard-cards">
          {Object.keys(bookCategories).map((category, index) => (
            <div key={index} className="card">
              <h3>{category} Books</h3>
              <p>{bookCategories[category]}</p>
            </div>
          ))}
        </section>

        {/* Overdue Books Management */}
        <section className="overdue-books">
          <h3>Overdue Books</h3>
          <table>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Borrower</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {books.filter(book => book.dueDate && new Date(book.dueDate) < new Date()).map((book, index) => (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{users.find(user => user.borrowedBooks.includes(book.title))?.name || "Unknown"}</td>
                  <td>{book.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Analytics */}
        <section className="analytics">
          <div className="graph">
            <h3>Most Popular Books</h3>
            <div className="pie-chart">📚 Popularity Data Here</div>
          </div>
          <div className="graph">
            <h3>Active Users</h3>
            <div className="pie-chart">Active Users: {activeUsers}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagerDashboard;
