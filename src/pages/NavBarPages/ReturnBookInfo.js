import React from 'react';
import './ReturnBookInfo.css';

function ReturnBookInfo() {
  return (
    <div className="returnbook-info-container67">
      <h1 className="title67">How to Return a Book</h1>
      <p className="description67">
        Returning a book is easy! After finishing your book, simply log in to your account, go to your
        dashboard, and select the "Return Book" option. You can return the book at the library or arrange
        for a pickup. Don't forget to make sure that the book is in good condition before returning it.
      </p>
      <p className="description67">
        You need to create an account by adding your email and password, or log in if you already have an account. 
        Once you're logged in, you can see the books you have borrowed, and simply select the one you'd like to return.
      </p>

      <div className="image-container67">
        <img 
          src="./juliastiles.jpg" 
          alt="Person returning a book" 
          className="returnbook-image67" 
        />
        <p className="image-caption67">
          Julia Stiles as Kat reading The Bell Jar by Sylvia Path in <i>10 Things I Hate About You</i>
        </p>
      </div>

      <div className="button-container67">
        <a href="/CustomerLogin" className="go-to-return-buttonb67">Go to Return</a>
        <a href="/HomePage" className="return-home-buttonb67">Return to Homepage</a>
      </div>
    </div>
  );
}

export default ReturnBookInfo;