import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import LibraryData from "./LibraryData"; // Import data file

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetch("/api/users/count")
      .then((res) => res.json())
      .then((data) => setUsersCount(data.count));
  }, []);

  useEffect(() => {
    if (LibraryData && LibraryData.books && LibraryData.users) {
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

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Admin Dashboard</div>
        <nav>
          <ul>
            <li className="active"><span>🏠</span> Statistics Panel</li>
            <li><span>📦</span> <Link to="/ManageBooks">Book Inventory</Link></li>
            <li><span>🔒</span> <Link to="/ErrorNotFound">Key Metrics</Link></li>
            <li><span>👥</span> <Link to="/ErrorNotFound">User Requests</Link></li>
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

        {/* Fake Stats: Pie Chart, Late Fine Slider, Requests from Users */}
        <section className="fake-stats">
          <div className="pie-chart">
            <h3>Books Borrowed This Week</h3>
            {/* Fake Pie Chart */}
            <div className="pie-chart-img"></div>
          </div>
          <div className="late-fine">
            <h3>Late Fine Collection</h3>
            {/* Slider for Late Fine */}
            <input type="range" min="0" max="500" value="200" className="fine-slider" />
            <p>Late Fine: $200</p>
          </div>
          <div className="user-requests">
            <h3>User Requests</h3>
            {/* Fake User Requests */}
            <ul>
              <li>Request: Borrow Book for Luna - Status: Pending</li>
              <li>Request: Extend Borrowing Time for Ron - Status: Approved</li>
              <li>Request: Add Book : Harry Potter from User:Draco</li>
            </ul>
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
                    <td>{book.borrower}</td>
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

export default AdminDashboard;
