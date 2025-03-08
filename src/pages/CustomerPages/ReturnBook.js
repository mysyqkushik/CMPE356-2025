import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LibraryData from "../ManagerPages/LibraryData";

const ReturnBook = () => {
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState(""); // Success message

  // Get the logged-in user
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (currentUser) {
      // Find the user in libraryData
      const user = LibraryData.userslogin.find(
        (user) => user.username === currentUser.username
      );

      if (user) {
        setBorrowedBooks(user.borrowedBooks);
      }
    }
  }, [currentUser]);

  const handleReturnBook = (bookTitle) => {
    // Remove the book from borrowed list
    const updatedBooks = borrowedBooks.filter(book => book !== bookTitle);

    // Update the state and libraryData
    setBorrowedBooks(updatedBooks);

    // Update libraryData users' borrowed books (mimicking database update)
    const updatedLibraryData = {
      ...LibraryData,
      userslogin: LibraryData.userslogin.map(user =>
        user.username === currentUser.username
          ? { ...user, borrowedBooks: updatedBooks }
          : user
      )
    };

    // Update the file in localStorage (simulating a real database update)
    localStorage.setItem('libraryData', JSON.stringify(updatedLibraryData));

    // Show success message
    setMessage(`You have successfully returned "${bookTitle}"`);
  };

  const handleReturnToDashboard = () => {
    // Navigate back to the dashboard
    navigate('/CustomerDashboard');
  };

  return (
    <div className="return-book-container">
      <h2>Issued Books</h2>
      {borrowedBooks.length > 0 ? (
        <div className="books-list">
          {borrowedBooks.map((book, index) => (
            <div key={index} className="book-item">
              <h3>{book}</h3>
              <button onClick={() => handleReturnBook(book)} className="return-button">
                Return
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You don't have any books issued currently.</p>
      )}
      {message && <div className="return-message">{message}</div>}

      {/* Return to Dashboard Button */}
      <button onClick={handleReturnToDashboard} className="dashboard-button">
        Return to Dashboard
      </button>
    </div>
  );
};

export default ReturnBook;
