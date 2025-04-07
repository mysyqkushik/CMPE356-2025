import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css';
import NavBar from './NavBar';
import Footer from './Footer';
import BookCarousel from './BookCarousel';
import ConveyerBelt from './ConveyerBelt';
import BookNews from './BookNews';
import bookData from './ManagerPages/LibraryData.js';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const searchContainerRef = useRef(null);
  
    useEffect(() => {
      if (searchTerm.length > 1) {
        const filteredSuggestions = bookData.books
          .filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 5);
        
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, [searchTerm]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
          setShowSuggestions(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleSearch = () => {
      if (searchTerm.trim() !== '') {
        sessionStorage.setItem('searchTerm', searchTerm);
        navigate('/search-results');
      }
    };

    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSuggestionClick = (bookTitle) => {
      sessionStorage.setItem('searchTerm', bookTitle);
      setSearchTerm(bookTitle);
      setShowSuggestions(false);
      navigate('/search-results');
    };

  const handleDropdownClick = () => {
    console.log("Dropdown clicked");
  };

  return (
    <div className="homepage">
      <NavBar />

      <div className="hero-section">
        <div className="search-container" ref={searchContainerRef}>
          <div className="dropdown">
            <button className="dropdown-button">Collections</button>
          </div>
          <input 
            type="text" 
            placeholder="Search Our Library Catalog" 
            value={searchTerm}
            onChange={handleInputChange}
            onClick={() => searchTerm.length > 1 && setShowSuggestions(true)}
            className="search-bar"
          />
          <button onClick={handleSearch} className="search-button">🔍</button>
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              <ul className="suggestions-list">
                {suggestions.map((book) => (
                  <li 
                    key={book.id} 
                    onClick={() => handleSuggestionClick(book.title)}
                    className="suggestion-item"
                  >
                    {book.image && (
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        className="suggestion-image" 
                      />
                    )}
                    <div className="suggestion-details">
                      <span className="suggestion-title">{book.title}</span>
                      <span className="suggestion-author">{book.author}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="tilt-container">
        <BookCarousel /> 
      </div>

      <div className="booknews-container">
        <BookNews /> 
      </div>

      <div className="belt-container">
        <ConveyerBelt /> 
      </div>

      <div className="library-cards-container">
        <li>
          <Link to="/RateABook" className="card-link">
            <div className="library-card">
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

      <Footer />
    </div>
  );
};

export default HomePage;