import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ManagerLogin.css";

const ManagerLogin = () => {
  const navigate = useNavigate();
  
  const managerCredentials = {
    username: "manager123",
    email: "manager@example.com",
    password: "1234",
  };

  useEffect(() => {
    sessionStorage.setItem("managerCredentials", JSON.stringify(managerCredentials));
  }, []);

  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const storedCredentials = JSON.parse(sessionStorage.getItem("managerCredentials"));
    if (
      inputValues.username === storedCredentials.username &&
      inputValues.email === storedCredentials.email &&
      inputValues.password === storedCredentials.password
    ) {
      navigate("/ManagerDashboard");
    } else {
      setError("Invalid login details. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Manager Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src="user.png" alt="User Icon" />
          <input type="text" name="username" placeholder="Username" value={inputValues.username} onChange={handleChange} />
        </div>
        <div className="input">
          <img src="envelope.png" alt="Email Icon" />
          <input type="email" name="email" placeholder="Email" value={inputValues.email} onChange={handleChange} />
        </div>
        <div className="input">
          <img src="lock.png" alt="Password Icon" />
          <input type="password" name="password" placeholder="Password" value={inputValues.password} onChange={handleChange} />
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="forgot-password">Forgot Password?<span> Click Here</span></div>
      <div className="submit-container">
        <button className="submit" onClick={handleSubmit}>Login</button>
      </div>
      <div className="home-button-container">
        <Link to="/Homepage">
          <button className="home-button">Return to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default ManagerLogin;
