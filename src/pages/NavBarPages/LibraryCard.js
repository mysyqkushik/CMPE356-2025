import React from "react";
import "./LibraryCard.css";
import { Link } from "react-router-dom";

const LibraryCard = () => {
  return (
    <div className="library-card-container44">
      <h1 className="title44">Library Card</h1>
      <img src="./librarycard.png" alt="Library Card" className="library-image44" />
      <p className="description44">
        A library card opens the doors to a world of knowledge! With a library card, 
        you enjoy more discounts, longer borrowing periods, and exclusive access
        to special collections. It's your passport to unlimited learning and discovery.
      </p>
      <p className="cta-text44">
        To create a library card, please <a href="/CustomerLogin">Login</a> or 
        <a href="/SignUp"> Create an Account</a>.
      </p>
      <a href="/HomePage" className="home-button44">Return to Home Page</a>
    </div>
  );
};

export default LibraryCard;
