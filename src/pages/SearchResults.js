import React, { useEffect, useState } from 'react';
import bookData from './ManagerPages/bookdata.json';  // Import your book data (adjust path accordingly)
import './SearchResults.css'

const SearchResults = () => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const searchTerm = sessionStorage.getItem('searchTerm'); // Get the search term from sessionStorage

  useEffect(() => {
    if (searchTerm) {
      const results = bookData.books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())  // Filter the books
      );
      setFilteredBooks(results); // Update the state with the filtered books
    }
  }, [searchTerm]);  // Re-run effect when searchTerm changes

  return (
    <div className="searchbox4-results-container"> {/* Add the container class here */}
    <div className="searchbox4-results-title-box">
      <h2>Search Results for "{searchTerm}"</h2>
      {filteredBooks.length > 0 ? (
        <ul className="searchbox4-ul"> {/* Add class for styling the list */}
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Published: {book.publishedDate}</p>
              <p>Category: {book.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found.</p>  // Show message if no books found
      )}
    </div>
  </div>
  );
};

export default SearchResults;
