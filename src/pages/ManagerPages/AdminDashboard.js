import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [firstName, setFirstName] = useState("");

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
    axios
      .get("http://localhost:8080/api/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const totalBooks = books.length;
  const booksBorrowed = books.filter((book) => book.status === "borrowed").length;
  const overdueBooks = books.filter(
    (book) => book.dueDate && new Date(book.dueDate) < new Date()
  ).length;

  const newBooks = [...books]
    .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
    .slice(0, 9); // latest 9

  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  const getFilteredBooks = () => {
    if (!books.length) return [];
    switch (selectedCategory) {
      case "total":
        return books;
      case "borrowed":
        return books.filter((book) => book.status === "borrowed");
      case "due":
        return books.filter((book) => book.dueDate && new Date(book.dueDate) < new Date());
      case "new":
        return newBooks;
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
          <div className="welcome-message">
            <h2>{firstName ? `Welcome, ${firstName}` : "Welcome, Admin"}</h2>
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
            <p className="big-number">{newBooks.length}</p>
          </div>
          <div className="card purple" onClick={() => handleCardClick("users")}>
            <h3>View Users</h3>
            <p className="big-number">{users.length}</p>
          </div>
        </section>

        {selectedCategory && selectedCategory !== "users" && (
          <section className="filtered-books">
          <div className="filtered-header">
            <h3 className="filtered-title">
              {selectedCategory === "total" && "All Books"}
         {selectedCategory === "borrowed" && "Books Currently Borrowed"}
                      {selectedCategory === "due" && "Overdue Books"}
                      {selectedCategory === "new" && "New Book Arrivals"}
            </h3>
            <Link to="/ManageBooks" className="edit-button-small">Edit</Link>
          </div>
        
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Publication Date</th>
                  <th>Quantity</th>
                  <th>Added By</th>
                  <th>Ratings</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredBooks().map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.publicationDate}</td>
                    <td>{book.quantity}</td>
                    <td>{book.addedBy === 1 ? "Admin" : book.addedBy === 2 ? "Manager" : "Unknown"}</td>
                    <td>{book.rating}</td>

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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td> {/* fixed field name */}
                    <td>{user.lastName}</td>   {/* fixed field name */}
                    <td>{user.email}</td>
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
