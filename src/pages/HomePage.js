import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css';
import NavBar from './NavBar';
import Footer from './Footer';
import BookCarousel from './BookCarousel';
import ConveyerBelt from './ConveyerBelt';

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
            <div className="dropdown-content">
              <a href="#">All Books</a>
              <a href="#">Academic Papers</a>
            </div>
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

      <div className="belt-container">
        <ConveyerBelt /> 
      </div>

      {/* Library Management Cards */}
      <div className="library-cards-container">
        <li>
          <Link to="/ManageBooks">
            <div className="library-card">
              <img src="comedy (1).png" alt="Book Icon" className="card-icon" />
              Manage Books
            </div>
          </Link>
        </li> 

        <div className="library-card">
          <img src="/comedy (1).png" alt="Borrow Icon" className="card-icon" />
          Explore Genres
        </div>
        <div className="library-card">
          <img src="/comedy (1).png" alt="Return Icon" className="card-icon" />
          New Arrivals
        </div>
        <div className="library-card">
          <img src="/comedy (1).png" alt="Issue Icon" className="card-icon" />
          View our Catalog
        </div>
      </div>

      {/* Need Help? Live Chat */}
      <div className="chat-button">
        <button>Need help? Chat live now</button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
