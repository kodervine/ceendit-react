import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();
  return localStorage.getItem("isUserSignedIn") ? (
    <Outlet />
  ) : (
    <Navigate to="signin" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
