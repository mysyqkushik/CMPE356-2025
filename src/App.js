import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage'; 
import CustomerLogin from './pages/CustomerLogin';
import AdminLogin from './pages/AdminLogin';
import ManagerLogin from './pages/ManagerLogin';
import './App.css';

const App = () => {
  return (
    <>
      <HomePage />
      <Routes>
        {/*<Route path="/" element={<HomePage />} /> */}
        <Route path="/CustomerLogin" element={<CustomerLogin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/ManagerLogin" element={<ManagerLogin />} />
      </Routes>
    </>
  );
};

export default App;
