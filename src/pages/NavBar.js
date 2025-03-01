import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
 <nav class="navbar">
 
  <div class="content-container">
    <img src="bookowl_prev_ui.png" className="owl-image" alt="Owl Logo"/>
    <span class="book-title">The<br></br>Book<br></br>Owl</span>
  </div>


  <ul class="nav-links">
  <li class="dropdown">
  <a href="#">Books&More</a>
  <ul class="dropdown-menu">
    <li><a href="#">Fiction</a></li>
    <li><a href="#">Non-Fiction</a></li>
    <li><a href="#">New Arrivals</a></li>
  </ul>
</li>

<li class="dropdown">
  <a href="#">Events</a>
  <ul class="dropdown-menu">
    <li><a href="#">Workshops</a></li>
    <li><a href="#">Author Talks</a></li>
    <li><a href="#">Book Clubs</a></li>
  </ul>
</li>

<li class="dropdown">
  <a href="#">Learning</a>
  <ul class="dropdown-menu">
    <li><a href="#">Library Cards</a></li>
    <li><a href="#">Research Help</a></li>
    <li><a href="#">E-Books</a></li>
  </ul>
</li>

<li class="dropdown">
  <a href="#">Services</a>
  <ul class="dropdown-menu">
    <li><a href="#">Library Cards</a></li>
    <li><a href="#">Research Help</a></li>
    <li><a href="#">E-Books</a></li>
  </ul>
</li>

<li class="dropdown">
  <a href="#">AboutUs</a>
  <ul class="dropdown-menu">
    <li><a href="#">Our Mission</a></li>
    <li><a href="#">Contact</a></li>
    <li><a href="#">Team</a></li>
  </ul>
</li>

  </ul>
  <div class="nav-right">
    <button class="account-btn">MyAccount</button>
    <select class="language-dropdown">
      <option>English</option>
      <option>Türkçe</option>
    </select>
  </div>
</nav>
  );
}

export default NavBar;