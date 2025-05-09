import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "" // Optional field for password change
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      if (!loggedInUser) {
          navigate("/UnifiedLogin");
          return;
      }

      // Fetch user data
      axios.get(`http://localhost:8080/api/users/profile/${loggedInUser.username}`)
          .then(response => {
              setUserData(response.data);
              setEditedData({
                  first_name: response.data.first_name || "",
                  last_name: response.data.last_name || "",
                  email: response.data.email || "",
                  username: response.data.username || "",
                  password: "" // Empty by default
              });
          })
          .catch(error => {
              console.error("Error fetching user data:", error);
              setError("Failed to load user data");
          });
  }, [navigate]);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedData(prev => ({
          ...prev,
          [name]: value
      }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      try {
          const updatedData = { ...editedData };
          // Only include password if it's not empty
          if (!updatedData.password) {
              delete updatedData.password;
          }

          const response = await axios.put(
              `http://localhost:8080/api/users/${userData.id}`,
              updatedData
          );

          if (response.data) {
              setSuccess("Profile updated successfully!");
              // Update session storage with new data
              const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
              sessionStorage.setItem("loggedInUser", JSON.stringify({
                  ...loggedInUser,
                  ...response.data
              }));
          }
      } catch (error) {
          console.error("Error updating profile:", error);
          setError(error.response?.data?.message || "Failed to update profile");
      }
  };

  if (!userData) {
      return <div className="loading-container-609">Loading...</div>;
  }

  return (
      <div className="edit-profile-container-609">
          <div className="profile-header-609">
              <h2>Edit Your Profile</h2>
              <div className="profile-decoration-609"></div>
          </div>
          
          {error && <div className="error-message-609">{error}</div>}
          {success && <div className="success-message-609">{success}</div>}
          
          <form onSubmit={handleSubmit} className="edit-profile-form-609">
              <div className="form-group-609">
                  <label htmlFor="first_name">First Name:</label>
                  <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={editedData.first_name}
                      onChange={handleInputChange}
                      required
                      className="input-field-609"
                  />
              </div>

              <div className="form-group-609">
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={editedData.last_name}
                      onChange={handleInputChange}
                      required
                      className="input-field-609"
                  />
              </div>

              <div className="form-group-609">
                  <label htmlFor="email">Email:</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field-609"
                  />
              </div>

              <div className="form-group-609">
                  <label htmlFor="username">Username:</label>
                  <input
                      type="text"
                      id="username"
                      name="username"
                      value={editedData.username}
                      onChange={handleInputChange}
                      required
                      className="input-field-609"
                  />
              </div>

              <div className="form-group-609">
                  <label htmlFor="password">New Password (leave blank to keep current):</label>
                  <input
                      type="password"
                      id="password"
                      name="password"
                      value={editedData.password}
                      onChange={handleInputChange}
                      className="input-field-609"
                  />
              </div>

              <div className="button-group-609">
                  <button type="submit" className="save-button-609">Save Changes</button>
                  <button 
                      type="button" 
                      className="cancel-button-609"
                      onClick={() => navigate("/CustomerDashboard")}
                  >
                      Return to Dashboard
                  </button>
              </div>
          </form>
      </div>
  );
};

export default CustomerLogin;