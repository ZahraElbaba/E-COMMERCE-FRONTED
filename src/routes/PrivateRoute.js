



// import { Navigate } from 'react-router-dom';
// import { useAuth } from "../context/AuthContext";


// const ProtectedRoute = ({ children, role }) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" />;
//   if (role && user.role !== role) return <Navigate to="/unauthorized" />;

//   return children;
// };

// export default ProtectedRoute;


// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Make sure AuthContext is setup correctly

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token } = useAuth(); // Get the user and token from context

  if (!token) {
    // If there's no token, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If the user doesn't have the required role, redirect to the home page (or any other page)
    return <Navigate to="/dashboard" />;
  }

  // If the user is authenticated and authorized, render the children (the protected component)
  return children;
};

export default ProtectedRoute;
