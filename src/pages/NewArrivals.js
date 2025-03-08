import React, { useState, useEffect } from "react";
import './NewArrivals.css';
import { books as allBooks } from './ManagerPages/LibraryData'; 

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]); 

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(allBooks));

    // Filter books published after 2010
    const filteredBooks = allBooks.filter(book => {
      const publishedYear = new Date(book.publishedDate).getFullYear(); 
      return publishedYear > 2010; 
    });

    setNewArrivals(filteredBooks); // Set the filtered new arrivals
  }, []); // Run once when the component mounts

  useEffect(() => {
    console.log(newArrivals); 
  }, [newArrivals]);

  return (
    <div className="app461">
      {/* Borrow button wrapped in div to ensure clickability */}
      <div className="borrow-button61">
        <a href="/CustomerLogin" className="borrow-button61-link">
          Borrow a Book
        </a>
      </div>

      {/* Heading now aligned to the left via CSS */}
      <h1 className="heading461">New Book Arrivals</h1>

      <div className="book-list461">
        {newArrivals.length === 0 ? (
          <p>No books available</p>
        ) : (
          newArrivals.map((book) => {
            return (
              <div key={book.id} className="book-card461">
                {/* Display image and title next to each other */}
                <div className="book-info">
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="book-image461" 
                  />
                  <h3>{book.title}</h3>
                </div>
                <p>Author: {book.author}</p>
                <p>Published Date: {book.publishedDate}</p>
                <p>Genre: {book.category}</p>
              </div>
            );
          })
        )}
      </div>
      {/* Return to Homepage Button */}
      <div className="return-home61">
        <a href="/HomePage" className="return-home61-btn">
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default NewArrivals;