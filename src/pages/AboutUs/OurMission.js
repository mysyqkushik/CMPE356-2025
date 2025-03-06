import React from 'react';
import './OurMission.css';

const OurMission = () => {
  return (
    <div className="mission-container">
      <h1 className="mission-title">Our Mission</h1>
      <a href="/HomePage" className="mission-image">
         <img src="bookowl_prev_ui.png" alt="Owl Logo" />
      </a>
      <p className="mission-description">
        At our Library Management System, we aim to provide an accessible and
        user-friendly platform where customers can explore a wide variety of fiction books across multiple genres. 
        Our goal is to foster a love for reading by enabling easy borrowing, rating, and discovering new arrivals. 
        Users can log in and see their borrowed books and due dates for returning. They can explore the website by searching for books in genre, author, or title.
        For admins and managers, we offer comprehensive access to book details, user information, and borrowing statistics. </p>
        
        <p className="mission-description"> 🦉 Happy Reading! 🦉</p>
        <p className="mission-description"> Regards, The Book Owl Team </p>
    </div>
  );
};

export default OurMission;
