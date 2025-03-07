import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import './NewArrivals.css';
import { books as allBooks } from './ManagerPages/LibraryData'; // Import books

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store selected category

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(allBooks)); // Store books in localStorage

    // Filter books based on selected category and published after 2010
    const filteredBooks = allBooks.filter(book => {
      const isCategoryMatch = selectedCategory ? book.category === selectedCategory : true; // Match category if selected
      return  isCategoryMatch;
    });

    setNewArrivals(filteredBooks); // Set the filtered new arrivals
  }, [selectedCategory]); // Runs when selectedCategory changes

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  return (
    <div>
      <h1>New Arrivals</h1>
      
      {/* Category Filters */}
      <div className="category-filters">
        {['Classic', 'Romance', 'Fantasy', 'Mystery', 'Thriller'].map((category) => (
          <button key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
        <button onClick={() => handleCategoryClick('')}>All Books</button>
      </div>

      {/* Display filtered books */}
      <div className="book-list">
        {newArrivals.length > 0 ? (
          newArrivals.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p>No new arrivals found for the selected category.</p>
        )}
      </div>
      
      {/* Back to Home Button */}
      <div className="back-home">
        <a href="/HomePage" className="back-home-btn">
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default NewArrivals;
