import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  if (!isLoggedIn) {
    // Redirect unauthorized users to /login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
