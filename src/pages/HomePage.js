import React, { useState } from 'react';
import './HomePage.css';
import NavBar from './NavBar';
import Footer from './Footer';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("Some value"); 

  const handleSearch = () => {
    console.log('Searching for', searchTerm);
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="search-container">
          <button className="dropdown-button">Collections</button>
          <input 
            type="text" 
            placeholder="Search Our Library Catalog" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <button onClick={handleSearch} className="search-button">🔍</button>
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
}

export default HomePage;
