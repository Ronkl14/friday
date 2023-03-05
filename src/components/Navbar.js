// import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";

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
      <button onClick={handleLogout}>Logout</button>
      {/* <p>{displayName}</p> */}
    </div>
  );
};

export default Navbar;
