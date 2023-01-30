import React from "react";
import { Navigate } from "react-router-dom";
import { currentUser } from "../firebase-config";

const ProtectedRoutes = ({ children }) => {
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoutes;
