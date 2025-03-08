import React from 'react';
import './Footer.css';

// Social media icons (React Icons)
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top section: 2 columns */}
      <div className="footer-top">
        {/* Column 1: Library Information */}
        <div className="footer-col">
          <h3>The Book Owl</h3>
          <div className="footer-col-content">
            <p>Kadir Has University<br />Istanbul Turkiye</p>
            <p>Tel: 708.687.3700</p>
            <p>
              <a href="mailto:thebookowl@thebookowllibrary.org">
                thebookowl@thebookowllibrary.org
              </a>
            </p>
          </div>
        </div>
        
        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <div className="footer-col-content">
            <ul>
              <li><a href="/OurMission">About Us</a></li>
              <li><a href="/ViewCatalog">Your Next Book</a></li>
              <li><a href="/EResources">eBooks</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Middle section: Social media links */}
      <div className="footer-middle">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div> 

      {/* Bottom section: Copyright & policy links */}
      <div className="footer-bottom">
        <p>© 2025 The Book Owl. All Rights Reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-use">Terms of Use</a> | <a href="/cookie-policy">Cookie Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;