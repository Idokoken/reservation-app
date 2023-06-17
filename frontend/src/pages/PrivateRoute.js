import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";

function PrivateRoute() {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
