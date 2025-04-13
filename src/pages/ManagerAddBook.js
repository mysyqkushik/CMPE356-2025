import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManagerNavBar from './ManagerNavBar';
import './ManagerPages/ManageBooks.css';

const ManageBooks = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(0);
  const [addedBy, setAddedBy] = useState(null);
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [showBookList, setShowBookList] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state for success message

  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async () => {
    const isEditing = Boolean(editingBookId);

    const bookData = {
      title: bookTitle,
      author,
      genre,
      publicationDate: publishedDate,
      quantity,
      rating,
      addedBy: isEditing
        ? addedBy
        : loggedInUser?.role === 'admin'
        ? 1
        : loggedInUser?.role === 'manager'
        ? 2
        : null,
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/books/${editingBookId}`, bookData);
      } else {
        await axios.post('http://localhost:8080/api/books', bookData);
      }

      resetForm();
      fetchBooks();
      setShowSuccessMessage(true); // Show success message after adding the book
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds
    } catch (error) {
      console.error('Error adding/updating book:', error);
    }
  };

  const handleEdit = (book) => {
    setBookTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setPublishedDate(book.publicationDate);
    setQuantity(book.quantity);
    setRating(book.rating || 0);
    setAddedBy(book.addedBy || null);
    setEditingBookId(book.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const resetForm = () => {
    setBookTitle('');
    setAuthor('');
    setPublishedDate('');
    setQuantity('');
    setGenre('');
    setRating(0);
    setAddedBy(null);
    setEditingBookId(null);
  };

  const toggleBookList = () => {
    setShowBookList(!showBookList);
  };

  const renderInteractiveStars = (ratingValue, setRatingValue) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((starVal) => (
          <span
            key={starVal}
            className={`star ${starVal <= ratingValue ? 'filled' : ''}`}
            onClick={() => setRatingValue(starVal)}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };
  
  const renderStaticStars = (ratingValue) => {
    const rounded = Math.round(ratingValue);
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((starVal) => (
          <span
            key={starVal}
            className={`star ${starVal <= rounded ? 'filled' : ''}`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <ManagerNavBar />
      <div className="manage-books-container">
        <h2>{editingBookId ? 'Edit Book' : 'Add Book'}</h2>
        <div className="form-container">
          <input
            type="text"
            placeholder="Book Title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <select className="genre-dropdown" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Select Genre</option>
            <option value="Fiction">Literary Fiction</option>
            <option value="Non-Fiction">Horror</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Historical Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Science Fiction">Adventure</option>
          </select>
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div>
            <label>Rating:</label>
            {renderInteractiveStars(rating, setRating)}
          </div>

          {editingBookId && (
            <select value={addedBy} onChange={(e) => setAddedBy(Number(e.target.value))}>
              <option value="">Select Added By</option>
              <option value={1}>Admin</option>
              <option value={2}>Manager</option>
            </select>
          )}

          <button onClick={handleAddBook}>
            {editingBookId ? 'Update Book' : 'Add Book'}
          </button>
        </div>

        {/* Success message */}
        {showSuccessMessage && <div className="success-message">Book List updated!</div>}

        <button className="toggle-book-list-btn" onClick={toggleBookList}>
          {showBookList ? 'Hide Book List' : 'Show Book List'}
        </button>

        {showBookList && (
          <>
            <h3>Book List</h3>
            <ul className="book-list">
              {books.map((book) => (
                <li key={book.id} className="book-item">
                  <div>
                    <h5>{book.title}</h5>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Published: {book.publicationDate}</p>
                    <p>Quantity: {book.quantity}</p>
                    <p>Rating: {renderStaticStars(book.rating)}</p>

                    <p>
                      Added By:{' '}
                      {book.addedBy === 1
                        ? 'Admin'
                        : book.addedBy === 2
                        ? 'Manager'
                        : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <button className="edit-btn" onClick={() => handleEdit(book)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default ManageBooks;
