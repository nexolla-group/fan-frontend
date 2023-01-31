import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnProtectedRoute = ({ children }) => {
  const { token, role } = useSelector((state) => state.user);
  return !token || token.trim() === "" ? (
    children
  ) : role == "user" ? (
    <Navigate to='/userHome' />
  ) : (
    <Navigate to='/admin' />
  );
};

export default UnProtectedRoute;
