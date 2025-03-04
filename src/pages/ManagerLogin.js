import React from "react";
import { Link } from "react-router-dom";
import './ManagerLogin.css';


const ManagerLogin = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Manager Login</div>
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
      <Link to="/ManagerDashboard">
      <button className="submit">Login</button>
      </Link>
      </div>
    </div>
  );
};
export default ManagerLogin;
