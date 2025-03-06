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
import SearchResults from './pages/SearchResults';
import OurMission from './pages//AboutUs/OurMission';
import Team from './pages/AboutUs/Team';
import BookRatings from './pages/BookRatings';
import ExploreGenres from './pages/ExploreGenres';
import ViewCatalog from './pages/ViewCatalog';



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
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/OurMission" element={<OurMission/>} />
        <Route path="/Team" element={<Team/>} />
        <Route path="/BookRatings" element={<BookRatings/>} />
        <Route path="/ExploreGenres" element={<ExploreGenres/>} />
        <Route path="/ViewCatalog" element={<ViewCatalog/>} />
      </Routes>
    </>
  );
};

export default App;
