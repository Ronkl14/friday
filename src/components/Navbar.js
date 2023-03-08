// import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  //   const [displayName, setDisplayName] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     setDisplayName(JSON.parse(localStorage.getItem(user)).displayName);
  //   }, []);

  function handleLogout() {
    signOut(auth);
  }

  function editPreferences() {
    navigate("/user-panel");
  }

  return (
    <div>
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
