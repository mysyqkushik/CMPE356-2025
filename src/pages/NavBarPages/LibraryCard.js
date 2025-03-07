import React from "react";
import "./LibraryCard.css";
import { Link } from "react-router-dom";

const LibraryCard = () => {
  return (
    <div className="library-card-container">
      <h1 className="title">Library Card</h1>
      <img src="./librarycard.png" alt="Library Card" className="library-image" />
      <p className="description">
        A library card opens the doors to a world of knowledge! With a library card, 
        you enjoy more discounts, longer borrowing periods, and exclusive access
        to special collections. It's your passport to unlimited learning and discovery.
      </p>
      <p className="cta-text">
        To create a library card, please <a href="/CustomerLogin">Login</a> or 
        <a href="/SignUp"> Create an Account</a>.
      </p>
      <a href="/HomePage" className="home-button">Return to Home Page</a>
    </div>
  );
};

export default LibraryCard;
