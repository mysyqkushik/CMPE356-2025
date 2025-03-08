import React from "react";
import "./BorrowBookInfo.css";

const BorrowBookInfo = () => {
  return (
    <div className="borrowbook-info-containerb35">
      <h1 className="titleb35">How to Borrow a Book</h1>

      <p className="descriptionb35">
        Borrowing a book is simple! To get started, you need to create an account. You can do this by entering your email address and creating a secure password. Create an account, enter your email and password, or log in if you already have an account. Once logged in, you can borrow books directly from your dashboard.
      </p>

      <p className="descriptionb35">
        You'll be taken to your personal dashboard where you can browse through available books in our catalog. Simply select the book you'd like to borrow, and you're all set!
      </p>

      <div className="image-containerbb35">
        <img
          src="./paulrudd.png"
          alt="Paul Rudd as Josh reading some Friedrich Nietzsche by the pool in Clueless"
          className="borrowbook-imageb35"
        />
        <p className="image-captionb35">
          Paul Rudd as Josh reading some Friedrich Nietzsche by the pool in <i>Clueless</i>.
        </p>
      </div>


      <a href="/CustomerLogin" className="go-to-borrow-buttonb35">
        Go to Borrow
      </a>

        <a href="/HomePage" className="return-home-buttonb35">
          Return to Home Page
        </a>
      </div>
  );
};

export default BorrowBookInfo;