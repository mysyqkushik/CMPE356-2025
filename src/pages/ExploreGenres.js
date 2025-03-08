import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import './ExploreGenres.css';
import { books as allBooks } from './ManagerPages/LibraryData'; // Import books

const ExploreGenres = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store selected category

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(allBooks)); // Store books in localStorage

    // Filter books based on selected category
    const filteredBooks = allBooks.filter(book => {
      const isCategoryMatch = selectedCategory ? book.category === selectedCategory : true; // Match category if selected
      return isCategoryMatch;
    });

    setNewArrivals(filteredBooks); // Set the filtered books
  }, [selectedCategory]); // Runs when selectedCategory changes

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  return (
    <div>
      <h1 className="heading88">Explore Genres</h1>
      
      {/* Borrow a Book button at top right */}
      <a href="/CustomerLogin" className="borrow-button88">
        Borrow a Book
      </a>

      {/* Category Filters */}
      <div className="category-filters88">
        {['Classic', 'Romance', 'Fantasy', 'Mystery', 'Thriller'].map((category) => (
          <button key={category} onClick={() => handleCategoryClick(category)} className="category-button88">
            {category}
          </button>
        ))}
        <button onClick={() => handleCategoryClick('')} className="category-button88">All Books</button>
      </div>

      {/* Display filtered books */}
      <div className="book-list88">
        {newArrivals.length > 0 ? (
          newArrivals.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p>No different genres found for the selected category.</p>
        )}
      </div>
      
      {/* Return to Homepage Button at the bottom middle */}
      <div className="back-home88">
        <a href="/HomePage" className="back-home-btn88">
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default ExploreGenres;