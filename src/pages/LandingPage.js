import React from "react";
import { Link } from "react-router-dom";
import { LandingPageStyled } from "../styled/LandingPageStyled";
import logo from "../assets/img/logo6.png";
import bored from "../assets/img/boredom.jpg";
import happy from "../assets/img/happy.jpg";
import { Button } from "@mui/material";

const LandingPage = () => {
  return (
    <LandingPageStyled>
      <div className="logo-wrap">
        <img src={logo} alt="logo" width="100%" />
      </div>
      <h3>
        The weekend has finally arrived and you want to hang out with your
        friends, but where shall you guys go? Chances are you will try to
        suggest a new place that you guys haven't checked out yet, but it won't
        work out and you will go to the same old place like every week
      </h3>
      <h1>BORING</h1>
      <h3>
        Stop wasting your time planning and let the machines decide for you! So
        why not get started right now?
      </h3>
      <div className="buttons">
        <Button variant="contained" color="secondary" className="btn">
          Login
        </Button>
        <Button variant="contained" color="secondary" className="btn">
          Register
        </Button>
      </div>
      <div className="photos">
        <div className="photos-box">
          <h4>You and your friends before Friday app:</h4>
          <div className="photo-wrap">
            <img src={bored} alt="bored people" width="100%" />
          </div>
        </div>
        <div className="photos-box">
          <h4>You and your friends after Friday app:</h4>
          <div className="photo-wrap">
            <img src={happy} alt="bored people" width="100%" />
          </div>
        </div>
      </div>
    </LandingPageStyled>
  );
};

export default LandingPage;

{
  /* "Ahoy, it's Mr. Krabs! I found this cheap knockoff of me own restaurant on
  the Friday app. The burgers were like me Krabby Patties, but for half the
price! The decor was a bit fishy, but me pockets were still jinglin' with
coins. Give the Friday app a try if you're lookin' to save some cash!" */
}

{
  /* <Link to="/register">Register</Link>
  <Link to="/login">Login</Link> */
}
