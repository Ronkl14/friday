import React from "react";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const auth = getAuth();
  function handleLogout() {
    signOut(auth);
  }

  const displayName = auth.currentUser.displayName;
  console.log(displayName);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>{displayName}</p>
    </div>
  );
};

export default Navbar;
