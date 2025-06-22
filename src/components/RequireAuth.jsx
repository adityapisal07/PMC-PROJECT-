import React from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const isLoggedIn = localStorage.getItem("userEmail");
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
