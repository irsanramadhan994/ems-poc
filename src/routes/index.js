import React from 'react'
import PrivateRoutes from './PrivateRoute';
import LoginPage from '../pages/LoginPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';


const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
        path="*"
        element={<Navigate to="/main" replace />}
    />
        {/* Protected route */}
        <Route path="/main" element={
          <PrivateRoutes>
            <MainPage />
          </PrivateRoutes>
        } />
        
        {/* Add more routes as needed */}
      </Routes>
    );
  };
  
  export default AppRoutes;