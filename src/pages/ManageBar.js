// ManageBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ManageBar.css';

function ManageBar() {
  return (
    <nav className="managebar">
      <div className="container">
        <a className="brand" href="#">The Book Owl</a>
        <button className="toggle-btn">
          <span className="icon"></span>
        </button>
        <div className="nav-links">
          <ul>
            <li><Link to="/ManageBooks">Add Book</Link></li>
            <li><Link to="/IssueBook">Issue Book</Link></li>
            <li><Link to="/ViewIssuedBooks">View Issued Books</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ManageBar;
