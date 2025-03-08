import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css';
import NavBar from './NavBar';
import Footer from './Footer';
import BookCarousel from './BookCarousel';
import ConveyerBelt from './ConveyerBelt';
import BookNews from './BookNews';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = () => {
      if (searchTerm.trim() !== '') {
        sessionStorage.setItem('searchTerm', searchTerm); // Store the search term temporarily
        navigate('/search-results'); // Navigate to the search results page
      }
    };

  const handleDropdownClick = () => {
    console.log("Dropdown clicked");
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */} 
      <div className="hero-section">
        <div className="search-container">
          <div className="dropdown">
            <button className="dropdown-button">Collections </button>
          </div>
          <input 
            type="text" 
            placeholder="Search Our Library Catalog" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
            className="search-bar"
          />
          <button onClick={handleSearch} className="search-button">🔍</button>
        </div>
      </div>

      {/* Book Carousel */}
      <div className="tilt-container">
        <BookCarousel /> 
      </div>

      <div className="booknews-container">
        <BookNews /> 
      </div>

      <div className="belt-container">
        <ConveyerBelt /> 
      </div>

      {/* Library Management Cards */}
      <div className="library-cards-container">
  <li>
    <Link to="/RateABook" className="card-link">
      <div className="library-card">
        {/* Kitap ikonu - Özel SVG */}
        <svg className="card-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className="card-title">Rate A Book</h3>
      </div>
    </Link>
  </li> 

  <li>
    <Link to="/WriteAReview" className="card-link">
      <div className="library-card">
        {/* New Arrivals ikonu - Özel SVG */}
        <svg className="card-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L15 15" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 3L2 6" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 3L22 6" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 19H18" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className="card-title">Write a Review</h3>
      </div>
    </Link>
  </li>
</div>

      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
