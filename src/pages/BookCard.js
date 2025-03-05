// BookCard.js
import React from "react";
import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      {/* For now, just display the title of the book to check */}
      <h2>{book.title}</h2>
      <img src='/BookCarousel1.png' alt={book.title} className="book-image" />
      <p>{book.author}</p>
      <p>Quantity: {book.quantity}</p>
    </div>
  );
};

export default BookCard;
