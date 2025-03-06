import React, { useState, useEffect } from "react";
import "./ManagerDashboard.css"; 
import { Link } from "react-router-dom";
import bookData from './bookdata.json'; 

const ManagerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    console.log(bookData); // Check if bookData is loaded correctly
    if (bookData.books && bookData.users) {
      setBooks(bookData.books);
      setUsers(bookData.users);
    } else {
      console.error('Error: Missing books or users data in bookData.');
    }
  }, []);
  

  // Book Statistics
  const totalBooks = books.length;
  console.log("Books:", books);
  const booksBorrowed = bookData.booksBorrowed.books.length;
  const overdueBooks = books.filter(book => book.dueDate && new Date(book.dueDate) < new Date()).length;
  const newBooks = books.filter(book => book.id >= 15 && book.id <= 23).length;

  // Click Handlers
 const handleCardClick = (category) => {
  console.log("Category selected: ", category);  // Debug log to ensure category is set
  setSelectedCategory(category);
};


const getFilteredBooks = () => {
  console.log("Selected category:", selectedCategory);  // Log selected category
  switch (selectedCategory) {
    case "total":
      return books;
    case "borrowed":
      return bookData.booksBorrowed.books.map((borrowedBook) => {
        // Find the corresponding book in the main books array to get the author
        const book = books.find(book => book.id === borrowedBook.id);
        return {
          ...borrowedBook,
          author: book ? book.author : "Unknown",  // Get author from the books array
          status: "borrowed"  // Mark as borrowed
        };
      });
    case "due":
      return books.filter(book => book.dueDate && new Date(book.dueDate) < new Date());
    case "new":
      return books.filter(book => book.id >= 15 && book.id <= 23);
    default:
      return [];
  }
};


  // Return Book Logic
  const returnBook = (bookId) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId ? { ...book, status: "available" } : book
      )
    );
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Manager Dashboard</div>
        <nav>
          <ul>
            <li className="active"><span>🏠</span> Statistics Panel</li>
            <li><span>📦</span> <Link to="/ManageBooks">Book Inventory</Link></li>
            <li><span>🔒</span> User Management</li>
            <li><span>📊</span> <Link to="/HomePage">Log Out</Link></li>
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
        </section>

        {/* Display Selected Books */}
        {selectedCategory && (
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
                  <th>Borrower</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
  {getFilteredBooks().map((book) => (
    <tr key={book.id}>
      <td>{book.title}</td>
      <td>{book.author}</td>  {/* Display Author */}
      <td>{book.status}</td> 
      <td>{book.borrower}</td> {/* Display Status */}
      <td>{book.dueDate || "N/A"}</td>  {/* Display Due Date */}
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
