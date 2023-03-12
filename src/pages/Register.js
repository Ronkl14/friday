import React from "react";
import { useState } from "react";
import { db } from "../utils/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, GeoPoint } from "firebase/firestore";
import { Link } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import registerImg from "../assets/img/register-page.jpg";
import { usePreferencesGlobalContext } from "../context/PreferencesContext";
import logo from "../assets/img/logo.png";

const Register = () => {
  const { setRedirected } = usePreferencesGlobalContext();
  const [registerData, setRegisterData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const auth = getAuth();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterData({ ...registerData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    ).then((userCredential) => {
      const user = userCredential.user;
      setDoc(doc(db, "users", user.uid), {
        name: registerData.name,
        location: null,
        geoPoint: new GeoPoint(0, 0),
        hangoutWith: [],
        hangoutType: [],
        hangoutRange: null,
        priceRange: null,
      });
      setRedirected(true);
      return updateProfile(user, { displayName: registerData.name });
    });
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
      <Box
        sx={{
          width: "50vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
          <div style={{ width: "10vw" }}>
            <img
              src={logo}
              width="100%"
              alt="logo"
              style={{ marginBottom: "2rem" }}
            />
          </div>
          <form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ marginBottom: "1rem" }}
                type="text"
                name="email"
                onChange={handleChange}
                label="E-mail"
              />
              <TextField
                sx={{ marginBottom: "1rem" }}
                type="text"
                name="name"
                onChange={handleChange}
                label="Name"
              />
              <TextField
                sx={{ marginBottom: "1rem" }}
                type="password"
                name="password"
                onChange={handleChange}
                label="Password"
              />
              <Button onClick={handleSubmit} variant="contained">
                Register
              </Button>
            </Box>
          </form>
          <Typography sx={{ textAlign: "center", mt: "1rem" }}>
            Already have an account?
            <Link to="/login">
              <Typography color="secondary">Login</Typography>
            </Link>
          </Typography>
        </Paper>
      </Box>
      <Box
        sx={{
          width: "50vw",
          backgroundImage: `url(${registerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
    </Box>
  );
};

export default Register;
