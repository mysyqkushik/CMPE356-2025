import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import NavBar from './NavBar';
import Footer from './Footer';
import BookCarousel from './BookCarousel';
import ConveyerBelt from './ConveyerBelt';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState(''); 

  const handleSearch = () => {
    console.log('Searching for', searchTerm);
  };

  const handleDropdownClick = () => {
    // Logic to toggle dropdown visibility (e.g., setting a state for showing the dropdown)
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
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-bar"
    />
    <button onClick={handleSearch} className="search-button">🔍</button>
  </div>
</div>


      {/* Book Carousel */}
      <div className="carousel-container">
        <BookCarousel /> {/* Adding the carousel here */}
      </div>


      <div className="belt-container">
        <ConveyerBelt /> {/* Adding the carousel here */}
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
}

export default HomePage;
