import React from 'react';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">THE BOOK OWL</h1>
      <ul className="nav-links">
        {/* Replace # with valid links if needed, or use buttons if not navigational */}
        <li><a href="/about">About Us</a></li> 
        <li><a href="/research">Research</a></li> 
        <li><a href="/services">Services</a></li>
        <li><button className="nav-button">Log In</button></li>
        <li><button className="nav-button">Sign Up</button></li>
        <li><a href="/faq">FAQ</a></li> 
      </ul>
    </nav>
  );
}

export default Navbar;
