import React from 'react';
import './Footer.css';

// Social media icons (React Icons)
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top section: 3 columns */}
      <div className="footer-top">
        {/* Column 1: Library Information (now The Book Owl) */}
        <div className="footer-col">
          <h3>The Book Owl</h3>
          <p>Kadir Has University<br />Istanbul Turkiye</p>
          <p>Tel: 708.687.3700</p>
          <p>
            <a href="mailto:thebookowl@thebookowllibrary.org">
              thebookowl@thebookowllibrary.org
            </a>
          </p>
        </div>
        
        {/* Column 2: Hours */}
        <div className="footer-col">
          <h3>Hours</h3>
          <ul>
            <li>Monday-Thursday: 9-7</li>
            <li>Friday &amp; Saturday: 9-5</li>
            <li>Sunday: Closed</li>
          </ul>
          <p className="view-closings">View/Holiday Closings</p>
        </div>
        
        {/* Column 3: Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Your Next Book</a></li>
            <li><a href="#">eBooks</a></li>
          </ul>
        </div>
      </div>

      
      <div className="footer-middle">
        <a href="#" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="#" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="#" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div> 

      {/* Bottom section: Copyright & policy links */}
      <div className="footer-bottom">
        <p>© 2025 The Book Owl. All Rights Reserved.</p>
        <p>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a> | <a href="#">Cookie Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;