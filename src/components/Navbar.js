import { getAuth, signOut } from "firebase/auth";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePreferencesGlobalContext } from "../context/PreferencesContext";

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { setRedirected, setUserPreferences, userPreferences } =
    usePreferencesGlobalContext();

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
      <Button onClick={() => navigate("/location-list")} variant="contained">
        All locations
      </Button>
    </div>
  );
};

export default Navbar;
