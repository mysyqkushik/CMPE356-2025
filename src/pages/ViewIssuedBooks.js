import React, { useState, useEffect } from 'react';
import ManageBar from './ManageBar';  
import './ViewIssuedBooks.css'; 

const ViewIssuedBooks = () => {
    const [issuedBooks, setIssuedBooks] = useState([]);

    useEffect(() => {
        // Fetch issued books from localStorage
        const savedIssuedBooks = JSON.parse(localStorage.getItem('issuedBooks')) || [];
        setIssuedBooks(savedIssuedBooks);
    }, []);

    return (
        <>
            <ManageBar />
            <div className="issued-books-container">
                <div className="issued-books-card">
                    <div className="issued-books-card-body">
                        <h2 className="issued-books-title">Issued Books</h2>
                        <div className="issued-books-table-container">
                            <table className="issued-books-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Book Title</th>
                                        <th>Author</th>
                                        <th>Issue Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {issuedBooks.length > 0 ? (
                                        issuedBooks.map((issue, index) => (
                                            <tr key={index}>
                                                <td>{issue.student}</td>
                                                <td>{issue.bookTitle}</td>
                                                <td>{issue.author}</td>
                                                <td>{issue.issueDate}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="no-records">
                                                No issued books
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewIssuedBooks;