import React from "react";
import "./ResearchHelp.css";

// Sample data for book links (Replace with real images and URLs)
const bookLinks = [
  { 
    title: "Penguin Classics",
    image: "./penguin.png", 
    link: "https://example.com/nonfiction1" 
  },
  { 
    title: "OverDrive",
    image: "./overdrive.png", 
    link: "https://example.com/nonfiction2" 
  },
  { 
    title: "GoodReads",
    image: "./goodreads.png", 
    link: "https://example.com/nonfiction3" 
  },
  { 
    title: "World of Books",
    image: "./wob.png", 
    link: "https://example.com/nonfiction4" 
  },
  { 
    title: "Five Books",
    image: "./5books.png", 
    link: "https://example.com/nonfiction5" 
  }
];

const ResearchHelp = () => {
  return (
    <div className="research-help-containerb35">
      <h1 className="titleb35">Search Books</h1>
      <p className="descriptionb35">
        This page provides you with popular and well-loved public book website links listing all kinds of books. If you find a book of your liking, please search for it in our catalog. If you do not find it, please send a request in the Services section to 'Add a Book'.
      </p>
      
      <div className="book-listb35">
        {bookLinks.map((book, index) => (
          <div key={index} className="book-cardb35">
            <img src={book.image} alt={book.title} className="book-imageb35" />
            <h2 className="book-titleb35">{book.title}</h2>
            <a href={book.link} target="_blank" rel="noopener noreferrer" className="book-linkb35">
              View More
            </a>
          </div>
        ))}
      </div>

      <a href="/HomePage" className="home-buttonb35">Return to Home Page</a>
    </div>
  );
};

export default ResearchHelp;
