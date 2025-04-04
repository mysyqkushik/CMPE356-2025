import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
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
import ReturnBook from './pages/CustomerPages/ReturnBook'
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
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/SplashPage",
    element: <SplashPage />,
  },
  {
    path: "/HomePage",
    element: <HomePage />,
  },
  {
    path: "/CustomerLogin",
    element: <CustomerLogin />,
  },
  {
    path: "/AdminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/ManagerLogin",
    element: <ManagerLogin />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/ManageBooks",
    element: <ManageBooks />,
  },
  {
    path: "/IssueBook",
    element: <IssueBook />,
  },
  {
    path: "/ViewIssuedBooks",
    element: <ViewIssuedBooks />,
  },
  {
    path: "/BorrowBook",
    element: <BorrowBook />,
  },
  {
    path: "/BookCarousel",
    element: <BookCarousel />,
  },
  {
    path: "/ConveyerBelt",
    element: <ConveyerBelt />,
  },
  {
    path: "/ManagerDashboard",
    element: <ManagerDashboard />,
  },
  {
    path: "/NewArrivals",
    element: <NewArrivals />,
  },
  {
    path: "/search-results",
    element: <SearchResults />,
  },
  {
    path: "/OurMission",
    element: <OurMission />,
  },
  {
    path: "/Team",
    element: <Team />,
  },
  {
    path: "/BookRatings",
    element: <BookRatings />,
  },
  {
    path: "/ExploreGenres",
    element: <ExploreGenres />,
  },
  {
    path: "/ViewCatalog",
    element: <ViewCatalog />,
  },
  {
    path: "/CustomerDashboard",
    element: <CustomerDashboard />,
  },
  {
    path: "/UserViewIssuedBooks",
    element: <UserViewIssuedBooks />,
  },
  {
    path: "/ReturnBook",
    element: <ReturnBook />,
  },
  {
    path: "/BookNews",
    element: <BookNews />,
  },
  {
    path: "/LibraryCard",
    element: <LibraryCard />,
  },
  {
    path: "/ResearchHelp",
    element: <ResearchHelp />,
  },
  {
    path: "/EResources",
    element: <EResources />,
  },
  {
    path: "/BorrowBookInfo",
    element: <BorrowBookInfo />,
  },
  {
    path: "/ReturnBookInfo",
    element: <ReturnBookInfo />,
  },
  {
    path: "/AccountInfo",
    element: <AccountInfo />,
  },
  {
    path: "/UserDetails",
    element: <UserDetails />,
  },
  {
    path: "/UserLibraryCard",
    element: <UserLibraryCard />,
  },
  {
    path: "/ErrorNotFound",
    element: <ErrorNotFound />,
  },
  {
    path: "/RateABook",
    element: <RateABook />,
  },
  {
    path: "/WriteAReview",
    element: <WriteAReview />,
  },
  {
    path: "/AdminDashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/MUserDetails",
    element: <MUserDetails />,
  },
  {
    path: "/UnifiedLogin",
    element: <UnifiedLogin />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:email",
    element: <ResetPassword />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
