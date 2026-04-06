import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('taskflow_isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Redirect unauthorized users to /login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
