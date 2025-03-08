import React from 'react';
import { Link } from 'react-router-dom';
import './ManageBar.css';

function ManageBar() {
  return (
    <nav className="managebar1">
      <div className="container1">
        <Link to="/HomePage" className="brand1">
            The Book Owl
        </Link>
        <button className="toggle-btn1">
          <span className="icon1"></span>
        </button>
        <div className="userbar1">
        <div className="nav-links1">
          <ul>
            <li><Link to="/ManageBooks">Add Book</Link></li>
            <li><Link to="/IssueBook">Issue Book</Link></li>
            <li><Link to="/ViewIssuedBooks">View Issued Books</Link></li>
            <li><Link to="/ManagerDashboard">Return to Dashboard</Link></li>
          </ul>
        </div>
        </div>
      </div>
    </nav>
  );
}

export default ManageBar;
