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

  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccessMessage("");
  };

  const handleSave = async () => {
    try {
      if (!currentPassword) {
        setError("Please enter your current password to save changes");
        return;
      }

      const updateData = {
        currentPassword: currentPassword,
        username: userDetails.username,
        email: userDetails.email,
        first_name: userDetails.firstName,
        last_name: userDetails.lastName
      };

      if (newPassword) {
        updateData.newPassword = newPassword;
      }

      // Make API call to update all fields
      const response = await axios.put(
        `http://localhost:8080/api/users/profile/${userDetails.email}`,
        updateData
      );

      // Update sessionStorage with new data
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      const updatedUser = {
        ...loggedInUser,
        username: userDetails.username,
        email: userDetails.email
      };
      
      sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      // Reset states
      setIsEditing(false);
      setCurrentPassword("");
      setNewPassword("");
      setSuccessMessage("Profile updated successfully!");
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
    <div className="user-details-container518">
      <h2 className="user-details-title518">My User Details</h2>
      
      {error && <div className="user-details-message518 error">{error}</div>}
      {successMessage && <div className="user-details-message518 success">{successMessage}</div>}

      <div className="user-details-content518">
        <div className="user-details-item518">
          <label className="user-details-label518">Username:</label>
          <input
            type="text"
            value={userDetails.username}
            onChange={(e) => handleChange("username", e.target.value)}
            disabled={!isEditing}
            className="user-details-value518"
          />
        </div>

        <div className="user-details-item518">
          <label className="user-details-label518">Email:</label>
          <input
            type="email"
            value={userDetails.email}
            onChange={(e) => handleChange("email", e.target.value)}
            disabled={!isEditing}
            className="user-details-value518"
          />
        </div>

        <div className="user-details-item518">
          <label className="user-details-label518">First Name:</label>
          <input
            type="text"
            value={userDetails.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            disabled={!isEditing}
            className="user-details-value518"
          />
        </div>

        <div className="user-details-item518">
          <label className="user-details-label518">Last Name:</label>
          <input
            type="text"
            value={userDetails.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            disabled={!isEditing}
            className="user-details-value518"
          />
        </div>

        <div className="user-details-item518">
          <label className="user-details-label518">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={!isEditing}
            placeholder="Enter new password"
            className="user-details-value518"
          />
        </div>

        {/* Current Password Field - Shows when editing */}
        {isEditing && (
          <div className="user-details-item518">
            <label className="user-details-label518">Current Password (required to save changes):</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password to confirm changes"
              className="user-details-value518"
            />
          </div>
        )}

        <div className="user-details-buttons518">
          {!isEditing ? (
            <button onClick={handleEdit}>
              Edit Profile
            </button>
          ) : (
            <button onClick={handleSave}>
              Save Changes
            </button>
          )}
          <button onClick={handleReturn}>
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;