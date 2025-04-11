import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDetails.css";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    password: false,
    firstName: false,
    lastName: false,
  });

  // Added for password changes
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Get logged in user from sessionStorage instead of localStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      // Fetch user profile data
      axios.get(`http://localhost:8080/api/users/profile/${loggedInUser.username}`)
        .then((response) => {
          setUserDetails({
            username: loggedInUser.username,
            email: loggedInUser.email,
            firstName: response.data.first_name,
            lastName: response.data.last_name || ""
          });
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setError("Failed to load user details");
        });
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    setError("");
    setSuccessMessage("");
  };

  const handleSave = async (field) => {
    try {
      if (!currentPassword) {
        setError("Please enter your current password to save changes");
        return;
      }

      const updateData = {
        currentPassword: currentPassword
      };

      // Set the field being updated
      if (field === "password") {
        if (!newPassword) {
          setError("Please enter a new password");
          return;
        }
        updateData.newPassword = newPassword;
      } else {
        updateData[field] = userDetails[field];
      }

      // Make API call to update the field
      const response = await axios.put(
        `http://localhost:8080/api/users/profile/${userDetails.email}`,
        updateData
      );

      // Update sessionStorage with new data
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      const updatedUser = { ...loggedInUser };
      
      if (field !== "password") {
        updatedUser[field] = userDetails[field];
      }
      
      sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      // Reset states
      setIsEditing((prev) => ({ ...prev, [field]: false }));
      setCurrentPassword("");
      if (field === "password") {
        setNewPassword("");
      }
      setSuccessMessage(`${field} updated successfully!`);
      setError("");

    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleChange = (field, value) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleReturn = () => {
    navigate("/CustomerDashboard");
  };

  return (
    <div className="user-details-container">
      <h2>My User Details</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="details">
        <label>Username:</label>
        <input
          type="text"
          value={userDetails.username}
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
          type="email"
          value={userDetails.email}
          onChange={(e) => handleChange("email", e.target.value)}
          disabled={!isEditing.email}
        />
        <div className="buttons">
          <button onClick={() => handleEdit("email")}>Edit</button>
          <button onClick={() => handleSave("email")} disabled={!isEditing.email}>
            Save
          </button>
        </div>

        <label>First Name:</label>
        <input
          type="text"
          value={userDetails.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          disabled={!isEditing.firstName}
        />
        <div className="buttons">
          <button onClick={() => handleEdit("firstName")}>Edit</button>
          <button onClick={() => handleSave("firstName")} disabled={!isEditing.firstName}>
            Save
          </button>
        </div>

        <label>Last Name:</label>
        <input
          type="text"
          value={userDetails.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          disabled={!isEditing.lastName}
        />
        <div className="buttons">
          <button onClick={() => handleEdit("lastName")}>Edit</button>
          <button onClick={() => handleSave("lastName")} disabled={!isEditing.lastName}>
            Save
          </button>
        </div>

        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={!isEditing.password}
          placeholder="Enter new password"
        />
        <div className="buttons">
          <button onClick={() => handleEdit("password")}>Edit</button>
          <button onClick={() => handleSave("password")} disabled={!isEditing.password}>
            Save
          </button>
        </div>

        {/* Current Password Field - Shows when any field is being edited */}
        {Object.values(isEditing).some(value => value) && (
          <div className="current-password-section">
            <label>Current Password (required to save changes):</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password to confirm changes"
            />
          </div>
        )}
      </div>

      <button className="return-btn" onClick={handleReturn}>
        Return to Dashboard
      </button>
    </div>
  );
};

export default UserDetails;