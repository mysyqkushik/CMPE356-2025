import React, { useState, useEffect } from 'react';
import ManageBar from './ManageBar';  
import './ManageBooks.css';
import { books as booksData } from './LibraryData';  // Import books data from librarydata.js

const ManageBooks = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [books, setBooks] = useState([]);
    const [editingBookId, setEditingBookId] = useState(null);
    const [showBookList, setShowBookList] = useState(true); // State for Book List visibility

    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem('books'));
        console.log(savedBooks); // Add a log here to see if data is loading
        if (!savedBooks || savedBooks.length === 0) {
            // Use the imported booksData as the fallback when there is no saved data
            localStorage.setItem('books', JSON.stringify(booksData));
            setBooks(booksData);
        } else {
            setBooks(savedBooks);
        }
    }, []);

    const handleAddBook = () => {
        if (editingBookId) {
            const updatedBooks = books.map((book) =>
                book.id === editingBookId
                    ? { ...book, title: bookTitle, author, publishedDate, quantity }
                    : book
            );
            setBooks(updatedBooks);  // Update the state here
            localStorage.setItem('books', JSON.stringify(updatedBooks));  // Save the updated list
            setEditingBookId(null);
        } else {
            const newBook = {
                id: Math.floor(Math.random() * 1000),
                title: bookTitle,
                author,
                publishedDate,
                quantity,
            };
            const updatedBooks = [...books, newBook];
            setBooks(updatedBooks);  // Update the state here
            localStorage.setItem('books', JSON.stringify(updatedBooks));  // Save the updated list
        }
        setBookTitle('');
        setAuthor('');
        setPublishedDate('');
        setQuantity('');
    };

    const handleEdit = (book) => {
        setBookTitle(book.title);
        setAuthor(book.author);
        setPublishedDate(book.publishedDate);
        setQuantity(book.quantity);
        setEditingBookId(book.id);
    };

    const handleDelete = (id) => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));  // Save the updated list
    };

    const toggleBookList = () => {
        console.log('Toggling book list visibility'); // Log state toggle
        setShowBookList(!showBookList);
    };

    return (
        <>
            <ManageBar />
            <div className="manage-books-container">
                <h2>Add Books</h2>
                <div className="form-container">
                    <input type="text" placeholder="Book Title" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
                    <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
                    <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <button onClick={handleAddBook}>
                        {editingBookId ? 'Update Book' : 'Add Book'}
                    </button>
                </div>

                {/* Book List Button */}
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
                                        <p>Published Date: {book.publishedDate}</p>
                                        <p>Quantity: {book.quantity}</p>
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
