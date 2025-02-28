import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="homepage">
      {/* Middle Section with brown background spanning the full width */}
      <div className="middle-section">
        <div className="content-container">
          {/* Image on the left */}
          <img src="/bookowl_prev_ui.png" alt="Book Owl" className="owl-image" />
          
          {/* Title with each word aligned to the left */}
          <h1 className="book-title">
            <span>The</span>
            <span>Book</span>
            <span>Owl</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search for books..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="homepage-footer">
        <p>Follow us on 
          <a href="https://facebook.com"> Facebook</a>, 
          <a href="https://twitter.com"> Twitter</a>, 
          <a href="https://instagram.com"> Instagram</a>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
