import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountOpen && !event.target.closest('.account-dropdown')) {
        setAccountOpen(false);
      }
      
      if (activeDropdown && !event.target.closest('.dropdown')) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [accountOpen, activeDropdown]);

  const toggleNav = () => {
    setNavOpen(!navOpen);
    if (accountOpen) setAccountOpen(false);
    if (activeDropdown) setActiveDropdown(null);
  };

  const toggleDropdown = (index, event) => {
    event.preventDefault();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleAccount = (event) => {
    event.stopPropagation();
    setAccountOpen(!accountOpen);
  };

  return (
    <nav className="navbar">
      {/* Sol taraftaki logo bölümü */}
      <div className="content-container">
        <img src="bookowl_prev_ui.png" className="owl-image" alt="Owl Logo" />
        <Link to="/HomePage" className="book-title">
          <span className="book-title">The<br />Book<br/> Owl</span>
        </Link>
      </div>

      {/* Hamburger butonu (mobilde gösterilir) */}
      <button 
        className="hamburger-button" 
        onClick={toggleNav}
      >
        &#9776;
      </button>

      {/* Menüler: navOpen true ise .show sınıfını ekleyelim */}
      <ul className={`nav-links ${navOpen ? 'show' : ''}`}>
        <li className={`dropdown ${activeDropdown === 0 ? 'open' : ''}`}>
          <a href="#" onClick={(e) => toggleDropdown(0, e)}>Books&More</a>
          <ul className="dropdown-menu">
            <li><a href="#">Fiction</a></li>
            <li><a href="#">Non-Fiction</a></li>
            <li><a href="#">New Arrivals</a></li>
          </ul>
        </li>
        <li className={`dropdown ${activeDropdown === 1 ? 'open' : ''}`}>
          <a href="#" onClick={(e) => toggleDropdown(1, e)}>Learning</a>
          <ul className="dropdown-menu">
            <li><a href="#">Library Cards</a></li>
            <li><a href="#">Research Help</a></li>
            <li><a href="#">E-Books</a></li>
          </ul>
        </li>
        <li className={`dropdown ${activeDropdown === 2 ? 'open' : ''}`}>
          <a href="#" onClick={(e) => toggleDropdown(2, e)}>Services</a>
          <ul className="dropdown-menu">
            <li><a href="#">Library Cards</a></li>
            <li><a href="#">Research Help</a></li>
            <li><a href="#">E-Books</a></li>
          </ul>
        </li>
        <li className={`dropdown ${activeDropdown === 3 ? 'open' : ''}`}>
          <a href="#" onClick={(e) => toggleDropdown(3, e)}>AboutUs</a>
          <ul className="dropdown-menu">
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Team</a></li>
          </ul>
        </li>
      </ul>

      {/* Sağ taraftaki kısım: MyAccount ve dil seçimi */}
      <div className={`nav-right ${navOpen ? 'show' : ''}`}>
        <div className="account-dropdown">
          <button 
            className="account-btn" 
            onClick={toggleAccount}
          >
            MyAccount
          </button>
          {accountOpen && (
            <ul className="account-dropdown-menu">
              <li><Link to="/AdminLogin">Admin Login</Link></li>
              <li><Link to="/ManagerLogin">Manager Login</Link></li>
              <li><Link to="/CustomerLogin">Customer Login</Link></li>
              <li><Link to="/SignUp">SignUp</Link></li>
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
};

export default NavBar;
