import React, { useState } from 'react';
import './HomePage.css'; 

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Library Management System</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/books">Books</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search for books..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <main className="homepage-main">
        <section className="cards-section">
          <h2>Featured Books</h2>
          <div className="card-container">
            <div className="card">
              <img src="book1.jpg" alt="Book 1" />
              <h3>Book Title 1</h3>
              <p>Author: Author 1</p>
            </div>
            <div className="card">
              <img src="book2.jpg" alt="Book 2" />
              <h3>Book Title 2</h3>
              <p>Author: Author 2</p>
            </div>
            <div className="card">
              <img src="book3.jpg" alt="Book 3" />
              <h3>Book Title 3</h3>
              <p>Author: Author 3</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="homepage-footer">
        <p>&copy; 2025 Library Management System. All rights reserved.</p>
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
