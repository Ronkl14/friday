// import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePreferencesGlobalContext } from "../context/PreferencesContext";

const Navbar = () => {
  //   const [displayName, setDisplayName] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const { setRedirected, setUserPreferences, userPreferences } =
    usePreferencesGlobalContext();

  //   useEffect(() => {
  //     setDisplayName(JSON.parse(localStorage.getItem(user)).displayName);
  //   }, []);

  function handleLogout() {
    setRedirected(false);
    setUserPreferences({});
    signOut(auth);
  }

  function editPreferences() {
    setRedirected(true);
    navigate("/preferences");
  }

  return (
    <div>
      <Typography>Hi, {userPreferences.name}</Typography>
      <Button variant="contained" onClick={editPreferences}>
        Change Preferences
      </Button>
      <Button onClick={handleLogout} variant="contained">
        Logout
      </Button>

      {/* <p>{displayName}</p> */}
    </div>
  );
};

export default Navbar;
