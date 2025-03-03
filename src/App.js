import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage'; 
import CustomerLogin from './pages/CustomerLogin';
import AdminLogin from './pages/AdminLogin';
import ManagerLogin from './pages/ManagerLogin';
import SignUp from './pages/SignUp';
import ManageBooks from './pages/ManageBooks';
import IssueBook from './pages/IssueBook';
import ViewIssuedBooks from './pages/ViewIssuedBooks';
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
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ManageBooks" element={<ManageBooks />} />
        <Route path="/IssueBook" element={<IssueBook />} />
        <Route path="/ViewIssuedBooks" element={<ViewIssuedBooks />} />
      </Routes>
    </>
  );
};

export default App;
