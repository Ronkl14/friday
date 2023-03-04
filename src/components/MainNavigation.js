import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const MainNavigation = () => {
  const location = useLocation();
  const showNavbar = !["/", "/login", "/register"].includes(location.pathname);
  return (
    <div>
      {showNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default MainNavigation;
