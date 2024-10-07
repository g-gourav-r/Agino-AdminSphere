import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import ProtectedRoute from './ProtectedRoutes.jsx';
import HomePage from '../Pages/HomePage.jsx';
import LoginPage from '../Pages/AuthPages/LoginPage.jsx';


function AppRouter() {
    return (
      <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />           
        </Routes>
      </Router>
    );
}

export default AppRouter;
