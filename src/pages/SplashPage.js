import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SplashPage.css';

const SplashPage = () => {
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const handleGetStarted = () => {
    navigate('/HomePage'); // Navigate to homepage
  };

  // Carousel settings
  const settings = {
    lazyLoad: 'ondemand', // Load images in high quality
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    arrows: false, // No next/prev arrows
  };

  return (
    <div className="splash-container">
      <Slider {...settings} className="carousel">
        <div className="slide">
          <img src="/4kbook1.jpeg" alt="Slide 1" />
          <div className="overlay">
            <h1>Welcome to Our Library</h1>
            <button onClick={handleGetStarted}>Get Started</button>
          </div>
        </div>
        <div className="slide">
          <img src="/4kbook2.jpg" alt="Slide 2" />
          <div className="overlay">
            <h1>Discover New Books</h1>
            <button onClick={handleGetStarted}>Get Started</button>
          </div>
        </div>
        <div className="slide">
          <img src="/4kbook3.jpg" alt="Slide 3" />
          <div className="overlay">
            <h1>Expand Your Knowledge</h1>
            <button onClick={handleGetStarted}>Get Started</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SplashPage;
