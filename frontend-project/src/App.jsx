import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SparePartsPage from './pages/SparePartsPage';
import StockInPage from './pages/StockInPage';
import StockOutPage from './pages/StockOutPage';
import ReportPage from './pages/ReportPage';

import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';



const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <SparePartsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/stock-in"
            element={
              <PrivateRoute>
                <StockInPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/stock-out"
            element={
              <PrivateRoute>
                <StockOutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PrivateRoute>
                <ReportPage />
              </PrivateRoute>
            }
          />
      
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;