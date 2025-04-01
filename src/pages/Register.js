import React, { useState } from "react";
import { registerUser } from "../services/api"; // Import API function

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer", // Default role
      });
      

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(user);
      alert("User registered successfully!");
      setUser({ name: "", email: "", password: "", role: "customer" });
    } catch (error) {
      alert("Error registering user");
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        

         {/* ✅ Role Selection Dropdown */}
         <select name="role" value={user.role} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>


        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
