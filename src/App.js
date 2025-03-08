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
import BorrowBook from './pages/CustomerPages/BorrowBook';
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
import CustomerDashboard from './pages/CustomerPages/CustomerDashboard';
import UserViewIssuedBooks from './pages/CustomerPages/UserViewIssuedBooks';
import ReturnBook from './pages/CustomerPages/ReturnBook';
import BookNews from './pages/BookNews';
import LibraryCard from './pages/NavBarPages/LibraryCard';
import ResearchHelp from './pages/NavBarPages/ResearchHelp';
import EResources from './pages/NavBarPages/EResources';
import BorrowBookInfo from './pages/NavBarPages/BorrowBookInfo';
import ReturnBookInfo from './pages/NavBarPages/ReturnBookInfo';
import AccountInfo from './pages/NavBarPages/AccountInfo';
import UserDetails from './pages/CustomerPages/UserDetails';
import UserLibraryCard from './pages/CustomerPages/UserLibraryCard';
import ErrorNotFound from './pages/ErrorNotFound';
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
        <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
        <Route path="/UserViewIssuedBooks" element={<UserViewIssuedBooks />} />
        <Route path="/ReturnBook" element={<ReturnBook />} />
        <Route path="/BookNews" element={<BookNews />} />
        <Route path="/LibraryCard" element={<LibraryCard />} />
        <Route path="/ResearchHelp" element={<ResearchHelp />} />
        <Route path="/EResources" element={<EResources />} />
        <Route path="/BorrowBookInfo" element={<BorrowBookInfo />} />
        <Route path="/ReturnBookInfo" element={<ReturnBookInfo />} />
        <Route path="/AccountInfo" element={<AccountInfo />} />
        <Route path="/UserDetails" element={<UserDetails />} />
        <Route path="/UserLibraryCard" element={<UserLibraryCard />} />
        <Route path="/ErrorNotFound" element={<ErrorNotFound />} />
      </Routes>
    </>
  );
};

export default App;