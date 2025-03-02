import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="content-container">
        <img src="bookowl_prev_ui.png" className="owl-image" alt="Owl Logo" />
        <span className="book-title">
          The<br />Book<br />Owl
        </span>
      </div>

      <ul className="nav-links">
        <li className="dropdown">
          <a href="#">Books&More</a>
          <ul className="dropdown-menu">
            <li><a href="#">Fiction</a></li>
            <li><a href="#">Non-Fiction</a></li>
            <li><a href="#">New Arrivals</a></li>
          </ul>
        </li>

        <li className="dropdown">
          <a href="#">Events</a>
          <ul className="dropdown-menu">
            <li><a href="#">Workshops</a></li>
            <li><a href="#">Author Talks</a></li>
            <li><a href="#">Book Clubs</a></li>
          </ul>
        </li>

        <li className="dropdown">
          <a href="#">Learning</a>
          <ul className="dropdown-menu">
            <li><a href="#">Library Cards</a></li>
            <li><a href="#">Research Help</a></li>
            <li><a href="#">E-Books</a></li>
          </ul>
        </li>

        <li className="dropdown">
          <a href="#">Services</a>
          <ul className="dropdown-menu">
            <li><a href="#">Library Cards</a></li>
            <li><a href="#">Research Help</a></li>
            <li><a href="#">E-Books</a></li>
          </ul>
        </li>

        <li className="dropdown">
          <a href="#">AboutUs</a>
          <ul className="dropdown-menu">
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Team</a></li>
          </ul>
        </li>
      </ul>

      <div className="nav-right">
        <div className="account-dropdown">
          <button className="account-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            MyAccount 
          </button>
          {dropdownOpen && (
            <ul className="account-dropdown-menu">
              <li><Link to="/LoginSignUp">Admin Login</Link></li>
              <li><Link to="/LoginSignUp">Manager Login</Link></li>
              <li><Link to="/LoginSignUp">Customer Login</Link></li>
              <li><Link to="/LoginSignUp">SignUp</Link></li>
            </ul>
          )}
        </div>
        
        <select className="language-dropdown">
          <option>English</option>
          <option>Türkçe</option>
        </select>
      </div>
    </nav>
  );
}

export default NavBar;
