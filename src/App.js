import "./App.css";
import {
  Login,
  // MainPage,
  Preferences,
  // Register,
  // UserPanel,
  ErrorPage,
  Register,
} from "./pages";
import { MainNavigation } from "./components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
  }, [auth]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Preferences /> : <Register />,
      errorElement: <ErrorPage />,
      children: [],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
