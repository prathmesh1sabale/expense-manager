import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Protects routes from unauthenticated access.
 * Redirects to "/login" if user is not logged in.
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("id");

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
