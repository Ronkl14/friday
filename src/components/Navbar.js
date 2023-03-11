import { getAuth, signOut } from "firebase/auth";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePreferencesGlobalContext } from "../context/PreferencesContext";
import navLogo from "../assets/img/logo5.png";

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

  function navigateHome() {
    navigate("/main");
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid #865DFF",
        height: "5rem",
        p: "1rem",
        width: "100vw",
      }}
    >
      {/* <Typography>Hi, {userPreferences.name}</Typography> */}
      <button
        style={{
          height: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        onClick={navigateHome}
      >
        <img src={navLogo} height="100%" />
      </button>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Button variant="outlined" sx={{ color: "white" }}>
          Add location
        </Button>
        <Button
          onClick={() => navigate("/location-list")}
          variant="outlined"
          sx={{ color: "white" }}
        >
          All locations
        </Button>
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="secondary"
          sx={{ color: "white" }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
