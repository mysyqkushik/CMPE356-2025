import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import './NewArrivals.css';

const NewArrivals = () => {
  const [books, setBooks] = useState([]);

  // Get the books from localStorage
  useEffect(() => {
      const defaultBooks = [
        { id: 15, title: "Beautiful World, Where Are You", author: "Sally Rooney", publishedDate: "2021-09-07", quantity: 6 },
        { id: 16, title: "Babel: An Arcane History", author: "R.F. Kuang", publishedDate: "2022-08-23", quantity: 8 },
        { id: 17, title: "The Man Who Died Twice", author: "Richard Osman", publishedDate: "2021-09-16", quantity: 7 },
        { id: 18, title: "Severance", author: "Ling Ma", publishedDate: "2019-05-07", quantity: 5 },
        { id: 19, title: "House of Sky and Breath", author: "Sarah J. Maas", publishedDate: "2022-02-15", quantity: 9 },
        { id: 20, title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", publishedDate: "2022-07-05", quantity: 6 },
        { id: 21, title: "Yellowface", author: "R.F. Kuang", publishedDate: "2023-05-16", quantity: 10 },
        { id: 22, title: "The Bullet That Missed", author: "Richard Osman", publishedDate: "2022-09-15", quantity: 4 },
        { id: 23, title: "Bliss Montage", author: "Ling Ma", publishedDate: "2022-09-13", quantity: 3 }
      ];
      localStorage.setItem('books', JSON.stringify(defaultBooks));
      console.log(defaultBooks);
      setBooks(defaultBooks);
  }, []);

  useEffect(() => {
    console.log(books); // Log the books to see if they're loaded
  }, [books]);

  return (
    <div className="app4">
      <h1 className="heading4">New Book Arrivals</h1>
      <div className="book-list4">
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        books.map((book) => {
          console.log(book); // Check if the book is getting mapped correctly
          return <BookCard key={book.id} book={book} />;
        })
      )}
    </div>
  </div>
  );
};

export default NewArrivals;
