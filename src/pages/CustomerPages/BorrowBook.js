import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import UserBar from './UserBar';
import './BorrowBook.css';

const BorrowBook = () => {
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const navigate = useNavigate();  // Initialize navigate for navigation

    useEffect(() => {
        const storedBooks = localStorage.getItem('bookData');
        if (storedBooks) {
            try {
                const parsedBooks = JSON.parse(storedBooks);
                setBooks(parsedBooks.books.filter(book => book.status === 'available'));
            } catch (error) {
                console.error('Error parsing local storage data:', error);
            }
        } else {
            fetch('/ManagerPages/bookdata.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('bookData', JSON.stringify(data));
                    setBooks(data.books.filter(book => book.status === 'available'));
                })
                .catch(error => console.error('Error fetching book data:', error));
        }
    }, []);

    const handleSelectedBookChange = (e) => {
        setSelectedBookId(e.target.value);
    };

    const handleBorrowDateChange = (e) => {
        setBorrowDate(e.target.value);
    };

    const handleBorrowBook = () => {
        if (!selectedBookId || !borrowDate) {
            alert('Please select a book and borrow date.');
            return;
        }

        const bookIndex = books.findIndex(b => b.id === parseInt(selectedBookId));
        if (bookIndex === -1) {
            alert('Book not found.');
            return;
        }

        const book = books[bookIndex];
        const returnDate = new Date(borrowDate);
        returnDate.setMonth(returnDate.getMonth() + 1);
        const formattedReturnDate = returnDate.toISOString().split('T')[0];

        const borrowedBook = {
            bookTitle: book.title,
            author: book.author,
            borrowDate: borrowDate,
            returnDate: formattedReturnDate,
        };

        const existingBorrows = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
        localStorage.setItem('borrowedBooks', JSON.stringify([...existingBorrows, borrowedBook]));

        const updatedBooks = [...books];
        updatedBooks[bookIndex].status = 'borrowed';
        const bookData = JSON.parse(localStorage.getItem('bookData'));
        bookData.books = updatedBooks;
        localStorage.setItem('bookData', JSON.stringify(bookData));

        setBooks(updatedBooks.filter(book => book.status === 'available'));
        setSelectedBookId('');
        setBorrowDate('');

        alert(`You have successfully borrowed "${book.title}".`);

        // Navigate to View Issued Books page immediately after borrowing
        navigate('/UserViewIssuedBooks');
    };

    return (
        <>
            <UserBar />
            <div className="borrow-book-container2">
                <div className="card2">
                    <div className="card2-body">
                        <h2 className="card-title2">Borrow Book</h2>
                        <form>
                            <div className="form-group2">
                                <label htmlFor="book">Select Book</label>
                                <select
                                    id="book"
                                    className="form-select2"
                                    value={selectedBookId}
                                    onChange={handleSelectedBookChange}
                                >
                                    <option value="">Select Book</option>
                                    {books.map((book) => (
                                        <option key={book.id} value={book.id}>
                                            {book.title} - {book.author}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group2 mt-3">
                                <label htmlFor="borrowDate">Borrow Date</label>
                                <input
                                    type="date"
                                    className="form-control2"
                                    id="borrowDate"
                                    value={borrowDate}
                                    onChange={handleBorrowDateChange}
                                />
                            </div>
                            <div className="form-group2 mt-3">
                                <label>Return Date (1 month later)</label>
                                <input
                                    type="text"
                                    className="form-control2"
                                    value={borrowDate ? new Date(new Date(borrowDate).setMonth(new Date(borrowDate).getMonth() + 1)).toLocaleDateString('en-GB') : ''}
                                    disabled
                                />
                            </div>
                            <button
                                type="button"
                                className="btn2 btn-primary2 mt-3"
                                onClick={handleBorrowBook}
                            >
                                Borrow Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BorrowBook;
