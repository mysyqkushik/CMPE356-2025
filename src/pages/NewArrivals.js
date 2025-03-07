import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import './NewArrivals.css';
import { books as allBooks } from './ManagerPages/LibraryData'; 

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]); 


  useEffect(() => {
   
    localStorage.setItem('books', JSON.stringify(allBooks));

    // Filter books published after 2010 (assuming 'publishedDate' is in YYYY-MM-DD format)
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
    <div className="app4">
      <h1 className="heading4">New Book Arrivals</h1>
      <div className="book-list4">
        {newArrivals.length === 0 ? (
          <p>No books available</p>
        ) : (
          newArrivals.map((book) => {
            console.log(book); // Check if the book is getting mapped correctly
            return <BookCard key={book.id} book={book} />;
          })
        )}
      </div>
      {/* Return to Homepage Button */}
      <div className="return-home">
        <a href="/HomePage" className="return-home-btn">
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default NewArrivals;
