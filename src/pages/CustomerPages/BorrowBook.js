import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import UserBar from './UserBar.js';
import './BorrowBook.css';

const BorrowBook = () => {
    // Directly use the book data constant
    const data = {
        books: [
            { 
                id: 1, 
                title: "The Great Gatsby", 
                author: "F. Scott Fitzgerald", 
                publishedDate: "1925-04-10", 
                quantity: 5, 
                status: "available", 
                category: "Classic", 
                dueDate: null,
                borrower: null,
                image: "/thegreatgatsby.jpg" 
              },
              { 
                id: 2, 
                title: "To Kill a Mockingbird", 
                author: "Harper Lee", 
                publishedDate: "1960-07-11", 
                quantity: 8, 
                status: "borrowed", 
                category: "Literary", 
                dueDate: "2025-03-01", 
                borrower: "Harry Potter",
                image: "/tokillamockingbird.jpg" 
              },
              { 
                id: 3, 
                title: "1984", 
                author: "George Orwell", 
                publishedDate: "1949-06-08", 
                quantity: 4, 
                status: "available", 
                category: "Classic", 
                dueDate: null,
                borrower: null,
                image: "/1984.jpg" 
              },
              { 
                id: 4, 
                title: "Moby-Dick", 
                author: "Herman Melville", 
                publishedDate: "1851-10-18", 
                quantity: 3, 
                status: "available", 
                category: "Classic", 
                dueDate: null,
                borrower: null,
                image: "/mobydick.jpg" 
              },
              { 
                id: 5, 
                title: "Pride and Prejudice", 
                author: "Jane Austen", 
                publishedDate: "1813-01-28", 
                quantity: 6, 
                status: "borrowed", 
                category: "Romance", 
                dueDate: "2025-03-14", 
                borrower: "Hermione Granger",
                image: "/p&p.jpg" 
              },
              { 
                id: 6, 
                title: "Animal Farm", 
                author: "George Orwell", 
                publishedDate: "1949-06-08", 
                quantity: 9, 
                status: "available", 
                category: "Classic", 
                dueDate: null,
                borrower: null,
                image: "/animalfarm.jpg" 
              },
              { 
                id: 7, 
                title: "Game of Thrones", 
                author: "George R. R. Martin", 
                publishedDate: "1996-08-01", 
                quantity: 20, 
                status: "borrowed", 
                category: "Fantasy", 
                dueDate: "2025-03-02", 
                borrower: "Harry Potter",
                image: "/got.jpg" 
              },
              { 
                id: 8, 
                title: "War and Peace", 
                author: "Leo Tolstoy", 
                publishedDate: "1869-01-01", 
                quantity: 2, 
                status: "available", 
                category: "Classic", 
                dueDate: null,
                borrower: null,
                image: "/war&peace.jpg" 
              },
              { 
                id: 9, 
                title: "Crime and Punishment", 
                author: "Fyodor Dostoevsky", 
                publishedDate: "1866-11-01", 
                quantity: 5, 
                status: "available", 
                category: "Classic", 
                dueDate: null,
                borrower: null,
                image: "/crime.jpg" 
              },
              { 
                id: 10, 
                title: "The Lord of the Rings", 
                author: "J.R.R. Tolkien", 
                publishedDate: "1954-07-29", 
                quantity: 9, 
                status: "borrowed", 
                category: "Fantasy", 
                dueDate: "2025-03-16", 
                borrower: "Luna Lovegood",
                image: "/lotr.jpg" 
              },
              { 
                id: 11, 
                title: "Yellowface", 
                author: "R.F. Kuang", 
                publishedDate: "2023-05-16", 
                quantity: 7, 
                status: "available", 
                category: "Thriller", 
                dueDate: null,
                borrower: null,
                image: "/yellowface.jpg" 
              },
              { 
                id: 12, 
                title: "Fourth Wing", 
                author: "Rebecca Yarros", 
                publishedDate: "2023-05-02", 
                quantity: 10, 
                status: "available", 
                category: "Fantasy", 
                dueDate: null,
                borrower: null,
                image: "/fourthwing.jpg" 
              },
              { 
                id: 13, 
                title: "Wuthering Heights", 
                author: "Emily Brontë", 
                publishedDate: "1847-12-17", 
                quantity: 3, 
                status: "borrowed", 
                category: "Romance", 
                dueDate: "2025-03-19", 
                borrower: "Hermione Granger",
                image: "/wutheringheights.jpg" 
              },
              { 
                id: 14, 
                title: "The Odyssey", 
                author: "Homer", 
                publishedDate: null, 
                quantity: 2, 
                status: "available", 
                category: "Classic", 
                dueDate: null,
                borrower: null,
                image: "/theodyssey.jpg" 
              },
              { 
                id: 15, 
                title: "The Brothers Karamazov", 
                author: "Fyodor Dostoevsky", 
                publishedDate: "1880-11-01", 
                quantity: 4, 
                status: "available", 
                category: "Classic", 
                dueDate: null,
                borrower: null,
                image: "/brothers.jpg" 
              },
              { 
                id: 16, 
                title: "Beautiful World, Where Are You", 
                author: "Sally Rooney", 
                publishedDate: "2021-09-07", 
                quantity: 6, 
                status: "borrowed", 
                category: "Literary", 
                dueDate: "2025-03-14", 
                borrower: "Hermione Granger",
                image: "/sallyrooney.jpg" 
              },
              { 
                id: 17, 
                title: "The Man Who Died Twice", 
                author: "Richard Osman", 
                publishedDate: "2021-09-16", 
                quantity: 7, 
                status: "available", 
                category: "Mystery", 
                dueDate: null,
                borrower: null,
                image: "/richardosman.jpg" 
              },
              { 
                id: 18, 
                title: "Severance", 
                author: "Ling Ma", 
                publishedDate: "2019-05-07", 
                quantity: 5, 
                status: "available", 
                category: "Thriller", 
                dueDate: null,
                borrower: null,
                image: "/severance.jpg" 
              },
              { 
                id: 19, 
                title: "House of Sky and Breath", 
                author: "Sarah J. Maas", 
                publishedDate: "2022-02-15", 
                quantity: 9, 
                status: "available", 
                category: "Fantasy", 
                dueDate: null,
                borrower: null,
                image: "/sarahjmaas.jpg" 
              },
              { 
                id: 20, 
                title: "Tomorrow, and Tomorrow, and Tomorrow", 
                author: "Gabrielle Zevin", 
                publishedDate: "2022-07-05", 
                quantity: 6, 
                status: "available", 
                category: "Literary", 
                dueDate: null,
                borrower: null,
                image: "/tomo.jpg" 
              },
              { 
                id: 21, 
                title: "The Bullet That Missed", 
                author: "Richard Osman", 
                publishedDate: "2022-09-15", 
                quantity: 4, 
                status: "borrowed", 
                category: "Mystery", 
                dueDate: "2025-03-22", 
                borrower: "Draco Malfoy",
                image: "/richardosman2.jpg" 
              },
              { 
                id: 22, 
                title: "Bliss Montage", 
                author: "Ling Ma", 
                publishedDate: "2022-09-13", 
                quantity: 3, 
                status: "available", 
                category: "Literary", 
                dueDate: null,
                borrower: null,
                image: "/blissmontage.jpg" 
              },
        ]
    };

    const [books, setBooks] = useState(data.books);  // Initialize books from data
    const [selectedBookId, setSelectedBookId] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const navigate = useNavigate();  // Initialize navigate for navigation

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
        // No need to update bookData since we're not using localStorage now

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
