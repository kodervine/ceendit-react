import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  return localStorage.getItem("isUserSignedIn") ? (
    <Outlet />
  ) : (
    <Navigate to="signin" />
  );
};

export default ProtectedRoutes;
