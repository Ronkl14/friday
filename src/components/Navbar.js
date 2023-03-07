// import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";

const Navbar = () => {
  //   const [displayName, setDisplayName] = useState("");
  const auth = getAuth();

  //   useEffect(() => {
  //     setDisplayName(JSON.parse(localStorage.getItem(user)).displayName);
  //   }, []);

  function handleLogout() {
    signOut(auth);
  }

  return (
    <div>
      <Button onClick={handleLogout} variant="contained">
        Logout
      </Button>
      {/* <p>{displayName}</p> */}
    </div>
  );
};

export default Navbar;
