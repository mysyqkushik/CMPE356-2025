import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./ReturnBook.css";

const ReturnBook = () => {
  const [userId, setUserId] = useState(""); // User ID input state
  const [bookId, setBookId] = useState(""); // Book ID input state
  const [borrowDate, setBorrowDate] = useState(""); // Borrow Date input state
  const [returnDate, setReturnDate] = useState(""); // Return Date input state
  const [borrowedBooks, setBorrowedBooks] = useState([]); // State for borrowed books list
  const [message, setMessage] = useState({ text: "", type: "" }); // Message state
  const [issuedBooks, setIssuedBooks] = useState([]); // State for issued books list

  // Fetch borrowed books on component mount
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
      // Fetch borrowed books
      axios
        .get(`http://localhost:8080/api/borrow/user/${loggedInUser.id}`)
        .then((response) => {
          setBorrowedBooks(response.data || []);
        })
        .catch((error) => console.error("Error fetching borrowed books:", error));
      
      // Fetch issued books
      axios
        .get(`http://localhost:8080/api/borrow/username/${loggedInUser.username}`)
        .then((response) => {
          setIssuedBooks(response.data || []);
        })
        .catch((error) => console.error("Error fetching issued books:", error));
    }
  }, []);

  // Handle form submission
  const handleReturnBook = (e) => {
    e.preventDefault();

    const returnBookRequest = {
      userId: userId,
      bookId: bookId,
      borrowDate: borrowDate,
      returnDate: returnDate,
    };

    // Send POST request to the backend to return the book
    axios
      .delete("http://localhost:8080/api/borrow/return", {
        data: returnBookRequest,
      })
      .then((response) => {
        setMessage({ text: "Book returned successfully!", type: "success" });
        // Clear form
        setBookId("");
        setBorrowDate("");
        setReturnDate("");
        // Refresh borrowed books list
        axios
          .get(`http://localhost:8080/api/borrow/user/${userId}`)
          .then((response) => {
            setBorrowedBooks(response.data || []);
          });
        // Refresh issued books list
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (loggedInUser) {
          axios
            .get(`http://localhost:8080/api/borrow/username/${loggedInUser.username}`)
            .then((response) => {
              setIssuedBooks(response.data || []);
            });
        }
      })
      .catch((error) => {
        setMessage({ text: "Error while returning the book", type: "error" });
        console.error(error);
      });
  };

  // Set return date automatically 1 month after borrow date
  const handleBorrowDateChange = (e) => {
    const borrowDateValue = e.target.value;
    setBorrowDate(borrowDateValue);

    // Automatically calculate return date (1 month after borrow date)
    const borrowDateObj = new Date(borrowDateValue);
    borrowDateObj.setMonth(borrowDateObj.getMonth() + 1); // Add 1 month
    setReturnDate(borrowDateObj.toISOString().split("T")[0]); // Set return date
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar-439">
        <div className="navbar-container-439">
          <div className="navbar-brand-439">
            <img src="bookowl_prev_ui.png" alt="Owl Logo" className="navbar-owl-439" />
            <Link to="/HomePage" className="navbar-title-439">
              THE<br />
              BOOK<br />
              OWL
            </Link>
          </div>
          <ul className="navbar-links-439">
            <li><Link to="/BorrowBook" className="navbar-link-439">Borrow Book</Link></li>
            <li><Link to="/ReturnBook" className="navbar-link-439">Return Book</Link></li>
            <li><Link to="/CustomerDashboard" className="navbar-link-439">Return to Dashboard</Link></li>
          </ul>
        </div>
      </nav>

      <div className="return-book-container">
        {/* Return Book Form */}
        <form onSubmit={handleReturnBook} className="return-book-form">
          <h2>Return Book</h2>
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Book ID:</label>
            <input
              type="number"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Borrow Date:</label>
            <input
              type="date"
              value={borrowDate}
              onChange={handleBorrowDateChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Return Date:</label>
            <input type="date" value={returnDate} disabled />
          </div>

          <button type="submit" className="return-button">
            Return Book
          </button>
        </form>

        {message.text && (
          <div className={`borrow-message-439 ${message.type}`}>
            {message.text}
          </div>
        )}

        

        {/* View Issued Books Section */}
        <div className="borrowed-books-list-439">
          <h3>View Issued Books</h3>
          <table className="book-table-439">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.bookId}</td>
                  <td>{book.bookTitle}</td>
                  <td>{new Date(book.borrowDate).toLocaleDateString()}</td>
                  <td>{new Date(book.returnDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReturnBook;
