import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authenticated = localStorage.getItem("authenticated");
  return authenticated === "true" ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
