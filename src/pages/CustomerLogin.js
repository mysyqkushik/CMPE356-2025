import React from "react";
import './CustomerLogin.css';


const CustomerLogin = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Customer Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs"> 
        <div className="input">
          <img src="user.png" alt="User Icon" /> {/* Ensure correct path */}
          <input type="text" placeholder="Username" />
        </div>
        <div className="input">
          <img src="envelope.png" alt="Email Icon" /> {/* Ensure correct path */}
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src="lock.png" alt="Password Icon" /> {/* Ensure correct path */}
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="forgot-password">Forgot Password?<span> Click Here</span></div>
      <div className="submit-container">
      <div className="submit">Login</div>
      </div>
    </div>
  );
};
export default CustomerLogin;
