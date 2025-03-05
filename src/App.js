import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage'; 
import CustomerLogin from './pages/CustomerLogin';
import AdminLogin from './pages/AdminLogin';
import ManagerLogin from './pages/ManagerLogin';
import SignUp from './pages/SignUp';
import ManageBooks from './pages/ManagerPages/ManageBooks';
import IssueBook from './pages/IssueBook';
import ViewIssuedBooks from './pages/ViewIssuedBooks';
import BorrowBook from './pages/BorrowBook';
import BookCarousel from './pages/BookCarousel';
import ConveyerBelt from './pages/ConveyerBelt';
import ManagerDashboard from './pages/ManagerPages/ManagerDashboard';
import NewArrivals from './pages/NewArrivals';


import './App.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element ={<SplashPage />} />
        <Route path="/HomePage" element={<HomePage />} /> 
        <Route path="/CustomerLogin" element={<CustomerLogin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/ManagerLogin" element={<ManagerLogin />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ManageBooks" element={<ManageBooks />} />
        <Route path="/IssueBook" element={<IssueBook />} />
        <Route path="/ViewIssuedBooks" element={<ViewIssuedBooks />} />
        <Route path="/BorrowBook" element={<BorrowBook/>} />
        <Route path="/BookCarousel" element={<BookCarousel/>} />
        <Route path="/ConveyerBelt" element={<ConveyerBelt/>} />
        <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
        <Route path="/NewArrivals" element={<NewArrivals/>} />
      </Routes>
    </>
  );
};

export default App;
