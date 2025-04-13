import React from 'react';
import { Link } from 'react-router-dom';
import './ManagerPages/ManageBar.css';


function ManageBar() {
  return (
    <nav className="managebar">
      <div className="managebar-container">
        <div className="managebar-brand">
          <img src="bookowl_prev_ui.png" alt="Owl Logo" className="managebar-owl" />
          <Link to="/HomePage" className="managebar-title">
  THE<br />
  BOOK<br />
  OWL
</Link>
        </div>
        <ul className="managebar-links">
          <li><Link to="/ManagerAddBook">Add Book</Link></li>
          <li><Link to="/ManagerIssueBook">Issue Book</Link></li>
          <li><Link to="/ManagerDashboard">Return to Dashboard</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default ManageBar;
