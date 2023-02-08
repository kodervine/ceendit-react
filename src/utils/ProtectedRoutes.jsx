import React from "react";

import { Outlet, Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";

const ProtectedRoutes = () => {
  const { userUpdated } = useGlobalContext();
  return userUpdated ? <Outlet /> : <Navigate to="signin" />;
};

export default ProtectedRoutes;
