import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
  <Link to="#" onClick={(e) => toggleDropdown(0, e)}>Books&More</Link>
  <ul className="dropdown-menu">
    <li><Link to="/ViewCatalog">View Catalog</Link></li>
    <li><Link to="/BookRatings">Book Ratings</Link></li>
    <li><Link to="/NewArrivals">New Arrivals</Link></li>
  </ul>
</li>
<li className={`dropdown ${activeDropdown === 1 ? 'open' : ''}`}>
  <Link to="#" onClick={(e) => toggleDropdown(1, e)}>Learning</Link>
  <ul className="dropdown-menu">
    <li><Link to="/LibraryCard">Library Cards</Link></li>
    <li><Link to="/ResearchHelp">Search Books</Link></li>
    <li><Link to="/EResources">E-Resources</Link></li>
  </ul>
</li>
<li className={`dropdown ${activeDropdown === 2 ? 'open' : ''}`}>
  <Link to="#" onClick={(e) => toggleDropdown(2, e)}>Services</Link>
  <ul className="dropdown-menu">
    <li><Link to="/BorrowBookInfo">Borrow Book</Link></li>
    <li><Link to="/ReturnBookInfo">Return Book</Link></li>
    <li><Link to="/AccountInfo">Request Book</Link></li>
  </ul>
</li>

        <li className={`dropdown ${activeDropdown === 3 ? 'open' : ''}`}>
          <Link to="#" onClick={(e) => toggleDropdown(3, e)}>AboutUs</Link>
          <ul className="dropdown-menu">
            <li><Link to="/OurMission">Our Mission</Link></li>
            <li><Link to="/Team">Team</Link></li>
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
      </div>
      <div className="nav-right-right">
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '🌞' : '🦇'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
