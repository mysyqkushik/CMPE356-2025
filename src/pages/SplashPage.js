// SplashPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css';
import VideoPlayer from './VideoPlayer';
import TypeWriter from './TypeWriter';

const SplashPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/HomePage');
  };

  return (
    <div className="splash-container">
         {/* Video Container */}
         <div className="my-video">
            <VideoPlayer />
         </div>

      

      {/* Overlay Content */}
      <div className="overlay3">
        <div className='main-title3'>
            <TypeWriter text="Meet Your Next Favourite Read" />
        </div>
      
        <div className="logo-container3">
          <img src="/bookowl_prev_ui.png" alt="Book Owl Logo" className="logo3" />
          <h2 className="sub-title3">THE <br /> BOOK <br /> OWL</h2>
        </div>
        <button className="get-started-btn3" onClick={handleGetStarted}>GET STARTED</button>
      </div>
    </div>
  );
};

export default SplashPage;
