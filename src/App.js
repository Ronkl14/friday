import {
  Login,
  MainPage,
  Preferences,
  Register,
  UserPanel,
  ErrorPage,
  LandingPage,
} from "./pages";
import { MainNavigation } from "./components";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLoadScript } from "@react-google-maps/api";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
const libraries = ["places"];

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "rgb(134, 93, 255)",
      },
      secondary: {
        main: "#E384FF",
      },
      background: {
        default: "#191825",
      },
    },
  });

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const auth = getAuth();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  console.log("google maps api loaded:", isLoaded);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainNavigation user={user} />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/preferences",
          element: user ? <Preferences /> : <Navigate to="/login" />,
        },
        {
          path: "/main",
          element: user ? <MainPage /> : <Navigate to="/login" />,
        },
        {
          path: "/user-panel",
          element: user ? <UserPanel /> : <Navigate to="/login" />,
        },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        router.navigate("/preferences");
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
  }, [auth, router]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
