import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDetails.css";  // Updated CSS file name

const UserDetails923 = () => {  // Updated component name
  const [userData923, setUserData923] = useState({  // Updated state name
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    currentPassword: "",
    newPassword: "",
  });

  const [isEditing923, setIsEditing923] = useState({  // Updated state name
    username: false,
    email: false,
    password: false,
    firstName: false,
    lastName: false,
  });

  const [currentPassword923, setCurrentPassword923] = useState("");  // Updated state name
  const [error923, setError923] = useState("");  // Updated state name
  const [successMessage923, setSuccessMessage923] = useState("");  // Updated state name

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserData923({
        username: currentUser.username || "",
        email: currentUser.email || "",
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
      });
    }
  }, []);

  const handleEdit923 = (field) => {  // Updated function name
    setIsEditing923((prev) => ({ ...prev, [field]: true }));
    setError923("");
    setSuccessMessage923("");
  };

  const handleSave923 = async (field) => {  // Updated function name
    try {
      if (!currentPassword923) {
        setError923("Please enter your current password to save changes");
        return;
      }

      const updateData = {
        currentPassword: currentPassword923
      };

      if (field === "password") {
        updateData.newPassword = userData923.newPassword;
      } else {
        updateData[field] = userData923[field];
      }

      const response = await fetch(`http://localhost:8080/api/users/profile/${userData923.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const updatedUser = { ...currentUser, [field]: userData923[field] };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setIsEditing923((prev) => ({ ...prev, [field]: false }));
      setCurrentPassword923("");
      setSuccessMessage923(`${field} updated successfully!`);
      setError923("");

    } catch (error) {
      setError923(error.message);
    }
  };

  const handleChange923 = (field, value) => {  // Updated function name
    setUserData923((prev) => ({ ...prev, [field]: value }));
  };

  const handleReturn923 = () => {  // Updated function name
    navigate("/CustomerDashboard");
  };

  return (
    <div className="user-details-container923">
      <h2>My User Details</h2>
      
      {error923 && <div className="error-message923">{error923}</div>}
      {successMessage923 && <div className="success-message923">{successMessage923}</div>}

      <div className="details923">
        {/* Username Field */}
        <label className="label923">Username:</label>
        <input
          className="input923"
          type="text"
          value={userData923.username}
          onChange={(e) => handleChange923("username", e.target.value)}
          disabled={!isEditing923.username}
        />
        <div className="buttons923">
          <button className="button923" onClick={() => handleEdit923("username")}>Edit</button>
          <button className="button923" onClick={() => handleSave923("username")} disabled={!isEditing923.username}>
            Save
          </button>
        </div>

        {/* Email Field */}
        <label className="label923">Email:</label>
        <input
          className="input923"
          type="email"
          value={userData923.email}
          onChange={(e) => handleChange923("email", e.target.value)}
          disabled={!isEditing923.email}
        />
        <div className="buttons923">
          <button className="button923" onClick={() => handleEdit923("email")}>Edit</button>
          <button className="button923" onClick={() => handleSave923("email")} disabled={!isEditing923.email}>
            Save
          </button>
        </div>

        {/* First Name Field */}
        <label className="label923">First Name:</label>
        <input
          className="input923"
          type="text"
          value={userData923.firstName}
          onChange={(e) => handleChange923("firstName", e.target.value)}
          disabled={!isEditing923.firstName}
        />
        <div className="buttons923">
          <button className="button923" onClick={() => handleEdit923("firstName")}>Edit</button>
          <button className="button923" onClick={() => handleSave923("firstName")} disabled={!isEditing923.firstName}>
            Save
          </button>
        </div>

        {/* Last Name Field */}
        <label className="label923">Last Name:</label>
        <input
          className="input923"
          type="text"
          value={userData923.lastName}
          onChange={(e) => handleChange923("lastName", e.target.value)}
          disabled={!isEditing923.lastName}
        />
        <div className="buttons923">
          <button className="button923" onClick={() => handleEdit923("lastName")}>Edit</button>
          <button className="button923" onClick={() => handleSave923("lastName")} disabled={!isEditing923.lastName}>
            Save
          </button>
        </div>

        {/* Password Field */}
        <label className="label923">New Password:</label>
        <input
          className="input923"
          type="password"
          value={userData923.newPassword || ""}
          onChange={(e) => handleChange923("newPassword", e.target.value)}
          disabled={!isEditing923.password}
          placeholder="Enter new password"
        />
        <div className="buttons923">
          <button className="button923" onClick={() => handleEdit923("password")}>Edit</button>
          <button className="button923" onClick={() => handleSave923("password")} disabled={!isEditing923.password}>
            Save
          </button>
        </div>

        {/* Current Password Field */}
        {Object.values(isEditing923).some(value => value) && (
          <div className="current-password-section923">
            <label className="label923">Current Password (required to save changes):</label>
            <input
              className="input923"
              type="password"
              value={currentPassword923}
              onChange={(e) => setCurrentPassword923(e.target.value)}
              placeholder="Enter current password to confirm changes"
            />
          </div>
        )}
      </div>

      <button className="button923 return-btn923" onClick={handleReturn923}>
        Return to Dashboard
      </button>
    </div>
  );
};

export default UserDetails923;