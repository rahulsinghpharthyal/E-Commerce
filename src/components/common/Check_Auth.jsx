import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Check_Auth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // if (location.pathname === "/") {
  //   if (!isAuthenticated) {
  //     return <Navigate to="/auth/login" />;
  //   } else {
  //     if (user?.role === "admin") {
  //       return <Navigate to="/admin/dashboard" />;
  //     } else {
  //       return <Navigate to="/shop/home" />;
  //     }
  //   }
  // }

  // if user is not authenticated and user try to go in "/login" & "/register" path so than:-
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/reset-password") ||
      location.pathname.includes("/get-recovery-link") ||
      location.pathname.includes("/reset-password/:id") ||
      location.pathname.includes("/paypal-return")

    )
  ) {
    return <Navigate to="/auth/login" />;
  }
  
  // if user is authenticated and user try to go in "/login" & "/register" path so than:-
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    // if user role is admin than:-
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  // if user is not authenticated and user role is not a admin and user try to "/login" & "/register" path so than:-
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  return<>{children}</>;
};

export default Check_Auth;
