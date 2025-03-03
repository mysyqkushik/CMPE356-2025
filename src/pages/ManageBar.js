// ManageBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ManageBar.css';

function ManageBar() {
  return (
    <nav className="managebar">
      <div className="container1">
        <a className="brand1" href="#">The Book Owl</a>
        <button className="toggle-btn1">
          <span className="icon1"></span>
        </button>
        <div className="nav-links1">
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
