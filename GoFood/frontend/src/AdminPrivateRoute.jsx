import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminPrivateRoute() {
  const isAdmin = JSON.parse(localStorage.getItem("Admin"));
  const auth = {
    admin: isAdmin,
  };

  if (auth.admin === true) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}
