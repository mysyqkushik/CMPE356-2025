import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import bookData from './ManagerPages/LibraryData.js';  // Import your book data
import './SearchResults.css';

const SearchResults = () => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const searchTerm = sessionStorage.getItem('searchTerm'); // Get the search term from sessionStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      const results = bookData.books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())  // Filter the books
      );
      setFilteredBooks(results); 
    }
  }, [searchTerm]);  

  const handleBorrow = (bookTitle) => {
    // Navigate to the customer login page
    navigate('/CustomerLogin'); 
  };

  const handleReturnHome = () => {
    navigate('/HomePage');
  };

  return (
    <>
      <div className="searchbox4-results-container"> 
        <div className="searchbox4-results-title-box">
          <h2>Search Results for "{searchTerm}"</h2>
          {filteredBooks.length > 0 ? (
            <ul className="searchbox4-ul"> 
              {filteredBooks.map((book) => (
                <li key={book.id}>
                  <img src={book.image} alt={book.title} className="book-image91" />
                  <h2>{book.title}</h2>
                  <p>Author: {book.author}</p>
                  <p>Published: {book.publishedDate}</p>
                  <p>Category: {book.category}</p>
                  <button 
                    className="borrow-btn" 
                    onClick={() => handleBorrow(book.title)}
                  >
                    Borrow
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
      
      {/* Return to Homepage Button */}
      <div>
        <button className="return-home-btn156" onClick={handleReturnHome}>
          Return to Homepage
        </button>
      </div>
    </>
  );
};

export default SearchResults;