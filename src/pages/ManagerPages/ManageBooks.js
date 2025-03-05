import React, { useState, useEffect } from 'react';
import ManageBar from './ManageBar';  
import './ManageBooks.css';

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
            const defaultBooks = [
                { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedDate: "1925-04-10", quantity: 5 },
                { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", publishedDate: "1960-07-11", quantity: 8 },
                { id: 3, title: "1984", author: "George Orwell", publishedDate: "1949-06-08", quantity: 4 },
                { id: 4, title: "Moby-Dick", author: "Herman Melville", publishedDate: "1851-10-18", quantity: 3 },
                { id: 5, title: "Pride and Prejudice", author: "Jane Austen", publishedDate: "1813-01-28", quantity: 6 },
                { id: 6, title: "The Catcher in the Rye", author: "J.D. Salinger", publishedDate: "1951-07-16", quantity: 7 },
                { id: 7, title: "The Hobbit", author: "J.R.R. Tolkien", publishedDate: "1937-09-21", quantity: 10 },
                { id: 8, title: "War and Peace", author: "Leo Tolstoy", publishedDate: "1869-01-01", quantity: 2 },
                { id: 9, title: "Crime and Punishment", author: "Fyodor Dostoevsky", publishedDate: "1866-11-01", quantity: 5 },
                { id: 10, title: "The Lord of the Rings", author: "J.R.R. Tolkien", publishedDate: "1954-07-29", quantity: 9 },
                { id: 11, title: "Jane Eyre", author: "Charlotte Brontë", publishedDate: "1847-10-16", quantity: 4 },
                { id: 12, title: "Wuthering Heights", author: "Emily Brontë", publishedDate: "1847-12-17", quantity: 3 },
                { id: 13, title: "The Odyssey", author: "Homer", publishedDate: "-700-01-01", quantity: 2 },
                { id: 14, title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", publishedDate: "1880-11-01", quantity: 4 }, 
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
            setBooks(defaultBooks);
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
            setBooks(updatedBooks);
            setEditingBookId(null);
        } else {
            const newBook = {
                id: Math.floor(Math.random() * 1000),
                title: bookTitle,
                author,
                publishedDate,
                quantity,
            };
            setBooks([...books, newBook]);
        }
        localStorage.setItem('books', JSON.stringify(books));
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
        localStorage.setItem('books', JSON.stringify(updatedBooks));
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
