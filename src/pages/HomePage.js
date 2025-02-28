import React, { useState } from 'react';
import './HomePage.css';
import Navbar from './NavBar'; // Import Navbar component

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <Navbar />

      {/* Middle Section with Brown Background Fully Spanning Width */}
      <div className="middle-section">
        {/* Logo & Title Container Positioned Next to Image */}
        <div className="logo-title">
          <h1 className="book-title">THE <br /> BOOK <br /> OWL</h1>
        </div>

        {/* Owl Image */}
        <img src="/bookowl_prev_ui.png" alt="Owl Logo" className="owl-logo" />

        {/* Search Bar Adjusted to Span 65% of the Width */}
        <div className="search-container">
          <button className="database-button">All Databases</button>
          <input 
            type="text" 
            placeholder="Search By Name, Author, ISBN..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
