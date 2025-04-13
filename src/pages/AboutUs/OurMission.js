import React from 'react';
import './OurMission.css';
import { Link } from 'react-router-dom';

const OurMission = () => {
  return (
    <div className="mission-container55">
      <h1 className="mission-title55">Our Mission</h1>
      <div className="mission-content55">
        <Link to="/HomePage" className="mission-image55">
          <img src="bookowl_prev_ui.png" alt="Owl" style={{ width: '400px' }} />
        </Link>
        <div className="mission-text-container55">
          <div className="mission-item55">
            <p className="mission-item-content55">
              At our Library Management System, we aim to provide an accessible and
              user-friendly platform where customers can explore a wide variety of fiction books across multiple genres. 
              Our goal is to foster a love for reading by enabling easy borrowing, rating, and discovering new arrivals. 
              Users can log in and see their borrowed books and due dates for returning. They can explore the website by searching for books in genre, author, or title.
              For admins and managers, we offer comprehensive access to book details, user information, and borrowing statistics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
