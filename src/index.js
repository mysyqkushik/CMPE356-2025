import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import HomePage from './pages/HomePage'; 
import CustomerLogin from './pages/CustomerLogin';
import AdminLogin from './pages/AdminLogin';
import ManagerLogin from './pages/ManagerLogin';
import SignUp from './pages/SignUp';
import ManageBooks from './pages/ManageBooks';
import IssueBook from './pages/IssueBook';
import ViewIssuedBooks from './pages/ViewIssuedBooks';
import BorrowBook from './pages/BorrowBook';
import BookCarousel from './pages/BookCarousel';
import ConveyerBelt from './pages/ConveyerBelt';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
