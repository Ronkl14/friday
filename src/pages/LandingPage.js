import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      "Ahoy, it's Mr. Krabs! I found this cheap knockoff of me own restaurant on
      the Friday app. The burgers were like me Krabby Patties, but for half the
      price! The decor was a bit fishy, but me pockets were still jinglin' with
      coins. Give the Friday app a try if you're lookin' to save some cash!"
    </div>
  );
};

export default LandingPage;
