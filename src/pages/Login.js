import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import loginImg from "../assets/img/login-page.jpg";
import logo from "../assets/img/logo.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { usePreferencesGlobalContext } from "../context/PreferencesContext";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { setUserPreferences, userPreferences, setRedirected, setAfterLogin } =
    usePreferencesGlobalContext();
  const auth = getAuth();

  useEffect(() => {
    setPersistence(auth, localStorage);
    (async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserPreferences(docSnap.data());
        console.log(docSnap.data());
        console.log(userPreferences);
      } else {
        console.log("No such document!");
      }
    })();
  }, [auth]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setRedirected(true);
    setAfterLogin(true);
    signInWithEmailAndPassword(auth, loginData.email, loginData.password).then(
      (response) => localStorage.setItem("user", JSON.stringify(response.user))
    );
  }

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Box
        sx={{
          width: "50vw",
          backgroundImage: `url(${loginImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50vw",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            borderRadius: "5px",
            p: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "25vw",
            m: "0 auto",
          }}
        >
          <img
            src={logo}
            width="120vw"
            alt="logo"
            style={{ marginBottom: "2rem" }}
          />
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ marginBottom: "1rem" }}
                type="email"
                name="email"
                onChange={handleChange}
                variant="outlined"
                label="E-mail"
              />
              <TextField
                sx={{ marginBottom: "1rem" }}
                type="password"
                name="password"
                onChange={handleChange}
                variant="outlined"
                label="Password"
              />
              <Button type="submit" variant="contained" color="secondary">
                Log in
              </Button>
            </Box>
          </form>
          <Typography sx={{ textAlign: "center", mt: "1rem" }}>
            Don't have an account?
            <Link to="/register">
              <Typography color="secondary">Register</Typography>
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
