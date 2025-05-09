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
import AdminDashboard from './pages/ManagerPages/AdminDashboard';
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
import MUserDetails from './pages/ManagerPages/MUserDetails';
import UserLibraryCard from './pages/CustomerPages/UserLibraryCard';
import ErrorNotFound from './pages/ErrorNotFound';
import RateABook from './pages/RateABook';
import WriteAReview from './pages/WriteAReview';
import UnifiedLogin from './pages/UnifiedLogin';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManagerIssueBook from './pages//ManagerIssueBook';
import ManagerAddBook from './pages/ManagerAddBook';
import ManagerNavBar from './pages/ManagerNavBar';
import HeaderSplash from './pages/HeaderSplash';
import EditUserProfile from './pages/EditUserProfile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';


const App = () => {

  return (
    
    <>
  
      <Routes>
        <Route path="/" element ={<HeaderSplash />} />
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
        <Route path="/RateABook" element={<RateABook />} />
        <Route path="/WriteAReview" element={<WriteAReview />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/MUserDetails" element={<MUserDetails />} />
        <Route path="/UnifiedLogin" element={<UnifiedLogin />} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<UnifiedLogin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/ManagerIssueBook" element={<ManagerIssueBook/>} />
        <Route path="/ManagerAddBook" element={<ManagerAddBook/>} />
        <Route path="/ManagerNavBar" element={<ManagerNavBar />} />
        <Route path="/HeaderSplash" element={<HeaderSplash />} />
        <Route path="/edit-profile" element={<EditUserProfile />} />
       
       
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        
      </Routes>
    </>
  );
};

export default App;