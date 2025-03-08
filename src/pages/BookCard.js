import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card88">
      <img src={book.image} alt={book.title} className="book-image88" />
      <div className="book-details88">
        <h3>{book.title}</h3>
        <p>Author: {book.author}</p>
        <p>Published Date: {book.publishedDate}</p>
        <p>Genre: {book.category}</p>
      </div>
    </div>
  );
};

export default BookCard;
