import React, { useState, useEffect } from 'react';
import UserBar from './UserBar';
import './BorrowBook.css';


const BorrowBook = () => {
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState('');
    const [borrowDate, setBorrowDate] = useState('');

    useEffect(() => {
        // Fetch books from local storage
        const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
        setBooks(savedBooks);
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

        const book = books.find(b => b.id === parseInt(selectedBookId)) || {};
        const returnDate = new Date(borrowDate);
        returnDate.setMonth(returnDate.getMonth() + 1);
        const formattedReturnDate = returnDate.toISOString().split('T')[0];

        const borrowedBook = {
            bookTitle: book.title || 'Unknown Title',
            author: book.author || 'Unknown Author',
            borrowDate: borrowDate,
            returnDate: formattedReturnDate,
        };

        const existingBorrows = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
        const updatedBorrows = [...existingBorrows, borrowedBook];
        localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrows));

        setSelectedBookId('');
        setBorrowDate('');
    };

    return (
        <>
        
    <UserBar />  {/* Include UserBar */}
            
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
                        value={borrowDate ? new Date(new Date(borrowDate).setMonth(new Date(borrowDate).getMonth() + 1)).toISOString().split('T')[0] : ''}
                        disabled
                    />
                </div>
                <button
                    type="button2"
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
