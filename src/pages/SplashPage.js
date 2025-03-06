// VideoPlayer.js Entegreli SplashPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer'; // Mevcut VideoPlayer bileşeninizi kullanın
import './SplashPage.css';

const SplashPage = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const fullText = "Meet Your Next Favourite Read";
  
  // Typewriter efekti
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);
  
  // Ana sayfaya yönlendirme
  const handleGetStarted = () => {
    navigate('/HomePage');
  };
  
  // 12 saniye sonra otomatik yönlendirme (opsiyonel)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/HomePage');
    }, 12000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-page">
      {/* Karartma Katmanı */}
      <div className="overlay"></div>
      
      {/* Video Arka Plan - Mevcut VideoPlayer bileşeninizi kullanın */}
      <div className="video-background">
        <VideoPlayer />
      </div>
      
      {/* Ana İçerik */}
      <div className="content">
        <div className="title-container">
          <h1 className="title">{typedText}</h1>
        </div>
        
        <div className="logo-and-cta">
          <div className="logo-container">
            <img src="/bookowl_prev_ui.png" alt="The Book Owl Logo" className="logo" />
            <div className="logo-text">THE BOOK OWL</div>
          </div>
          
          <button className="cta-button" onClick={handleGetStarted}>
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;