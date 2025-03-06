import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UserViewIssuedBooks.css';

const UserViewIssuedBooks = () => {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const navigate = useNavigate(); // Hook to navigate

    useEffect(() => {
        const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
        setIssuedBooks(borrowedBooks);
    }, []);

    // Function to handle redirection to the dashboard
    const handleReturnToDashboard = () => {
        navigate('/CustomerDashboard');
    };

    return (
        <div className="issued-books-container1">
            <h2>Issued Books</h2>
            <table>
                <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Borrow Date</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {issuedBooks.length === 0 ? (
                        <tr><td colSpan="4">No issued books yet.</td></tr>
                    ) : (
                        issuedBooks.map((book, index) => (
                            <tr key={index}>
                                <td>{book.bookTitle}</td>
                                <td>{book.author}</td>
                                <td>{book.borrowDate}</td>
                                <td>{book.returnDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Button to return to dashboard */}
            <div className="return-dashboard-container">
                <button onClick={handleReturnToDashboard} className="return-dashboard-button">
                    Return to Dashboard
                </button>
            </div>
        </div>
    );
};

export default UserViewIssuedBooks;
