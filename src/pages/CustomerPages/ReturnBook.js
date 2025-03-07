import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnBook = () => {
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState(""); // To display the success message

  // Get the currently logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const borrowedBooksData = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    const userBooks = borrowedBooksData.filter(book => book.userId === currentUser.id);
    setBorrowedBooks(userBooks);
  }, []);

  const handleReturnBook = (bookId, bookTitle) => {
    // Remove the returned book from the list of borrowed books
    const updatedBooks = borrowedBooks.filter(book => book.id !== bookId);

    // Update the borrowed books data in localStorage
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBooks));

    // Show the success message
    setMessage(`You have returned "${bookTitle}"`);

    // After a short delay, redirect back to the dashboard
    setTimeout(() => {
      navigate('/CustomerDashboard');
    }, 1000); // 2 seconds delay for message visibility
  };

  return (
    <div className="return-book-container">
      <h2>Issued Books</h2>
      {borrowedBooks.length > 0 ? (
        <div className="books-list">
          {borrowedBooks.map((book) => (
            <div key={book.id} className="book-item">
              <h3>{book.bookTitle}</h3>
              <p>Author: {book.author}</p>
              <p>Due Date: {book.returnDate}</p>
              <button onClick={() => handleReturnBook(book.id, book.bookTitle)} className="return-button">
                Return
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You don't have any books issued currently.</p>
      )}
      {message && <div className="return-message">{message}</div>}
    </div>
  );
};

export default ReturnBook;
