import React from 'react';
import { Link } from 'react-router-dom';
import './UserBar.css';  // Import the UserBar CSS

const UserBar = () => {
    return (
        <div className="userbar">
            <Link to="/borrowBook" className="userbar-link">Borrow Book</Link>
            <Link to="/returnBook" className="userbar-link">Return Book</Link>
            <Link to="/viewIssuedBooks" className="userbar-link">View Issued Books</Link>
        </div>
    );
};

export default UserBar;
