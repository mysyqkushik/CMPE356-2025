import React from 'react';
import { Link } from 'react-router-dom';
import './UserBar.css';  // Updated import

const UserBar = () => {
    return (
        <nav className="userbar41">
            <div className="container41">
                <Link to="/HomePage" className="brand41">
                    The Book Owl
                </Link>
                <button className="toggle-btn41">
                    <span className="icon41"></span>
                </button>
                
                <div className="nav-links41">
                    <Link to="/borrowBook" className="userbar-link41">Borrow Book</Link>
                    <Link to="/returnBook" className="userbar-link41">Return Book</Link>
                    <Link to="/CustomerDashboard" className="userbar-link41">Return to Dashboard</Link>
                </div>
            </div>
        </nav>
    );
};

export default UserBar;
