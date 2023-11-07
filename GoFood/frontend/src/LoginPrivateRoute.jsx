import React from "react";
import { Outlet, Navigate } from "react-router-dom";
export default function LoginPrivateRoute() {
  const authToken = JSON.stringify(localStorage.getItem("authToken"));
  const auth = {
    loggedIn: authToken,
  };

  if (auth.loggedIn !== "null") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}
