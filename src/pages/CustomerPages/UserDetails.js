import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDetails.css";

const UserDetails = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    active: false,
  });

  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    password: false,
    phone: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserData(currentUser);
    }
  }, []);

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    localStorage.setItem("currentUser", JSON.stringify(userData));
    alert("You have saved your changes!");
  };

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReturn = () => {
    navigate("/CustomerDashboard");
  };

  return (
    <div className="user-details-container">
      <h2>My User Details</h2>
      <div className="details">
        <label>Username:</label>
        <input
          type="text"
          value={userData.username}
          onChange={(e) => handleChange("username", e.target.value)}
          disabled={!isEditing.username}
        />
        <div className="buttons">
          <button onClick={() => handleEdit("username")}>Edit</button>
          <button onClick={() => handleSave("username")} disabled={!isEditing.username}>
            Save
          </button>
        </div>

        <label>Email:</label>
        <input
          type="text"
          value={userData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          disabled={!isEditing.email}
        />
        <div className="buttons">
          <button onClick={() => handleEdit("email")}>Edit</button>
          <button onClick={() => handleSave("email")} disabled={!isEditing.email}>
            Save
          </button>
        </div>

        <label>Password:</label>
        <input
          type="password"
          value={userData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          disabled={!isEditing.password}
        />
        <div className="buttons">
          <button onClick={() => handleEdit("password")}>Edit</button>
          <button onClick={() => handleSave("password")} disabled={!isEditing.password}>
            Save
          </button>
        </div>

        <label>Phone Number:</label>
        <input
          type="text"
          value={userData.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          disabled={!isEditing.phone}
        />
        <div className="buttons">
          <button onClick={() => handleEdit("phone")}>Edit</button>
          <button onClick={() => handleSave("phone")} disabled={!isEditing.phone}>
            Save
          </button>
        </div>

        <label>Active Status:</label>
        <input type="text" value={userData.active ? "Active" : "Inactive"} disabled />
      </div>

      <button className="return-btn" onClick={handleReturn}>
        Return to Dashboard
      </button>
    </div>
  );
};

export default UserDetails;
