import React, { useState } from "react";
import axios from "axios";
import "./ReturnBook.css";

const ReturnBook = () => {
  const [userId, setUserId] = useState(""); // User ID input state
  const [bookId, setBookId] = useState(""); // Book ID input state
  const [borrowDate, setBorrowDate] = useState(""); // Borrow Date input state
  const [returnDate, setReturnDate] = useState(""); // Return Date input state

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
        alert(response.data); // Book returned successfully
      })
      .catch((error) => {
        alert("Error while returning the book");
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
    <div className="return-book-container">
      <h2>Return Book</h2>
      <form onSubmit={handleReturnBook} className="return-book-form">
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
    </div>
  );
};

export default ReturnBook;
