import React from "react";
import { Link } from "react-router-dom";
import './SignUp.css';


const SignUp = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs"> 
        <div className="input">
          <img src="user.png" alt="User Icon" /> {/* Ensure correct path */}
          <input type="text" placeholder="First Name" />
        </div>
        <div className="input">
          <img src="user.png" alt="User Icon" /> {/* Ensure correct path */}
          <input type="text" placeholder="Last Name" />
        </div>
        <div className="input">
          <img src="user.png" alt="User Icon" /> {/* Ensure correct path */}
          <input type="text" placeholder="Username" />
        </div>
        <div className="input">
          <img src="envelope.png" alt="Email Icon" /> {/* Ensure correct path */}
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src="lock.png" alt="Password Icon" /> 
          <input type="password" placeholder="Password" />
        </div>
      </div>
      {/*<div className="forgot-password">Forgot Password?<span> Click Here</span></div> */}
      <div className="submit-container">
        <div className="submit">Sign Up</div>
      </div>
      <div className="home-button-container">
        <Link to="/Homepage">
          <button className="home-button">Return to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;