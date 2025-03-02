import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage'; 
import LoginSignUp from './pages/LoginSignUp';

const App = () => {
  return (
    <>
      <HomePage />
      <Routes>
        {/*<Route path="/" element={<HomePage />} /> */}
        <Route path="/LoginSignUp" element={<LoginSignUp />} />
      </Routes>
    </>
  );
};

export default App;
