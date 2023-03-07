import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";
import { TextField, Button, Box } from "@mui/material";
import loginImg from "../assets/img/login-page.jpg";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth();

  useEffect(() => {
    setPersistence(auth, localStorage);
  }, [auth]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginData.email, loginData.password).then(
      (response) => localStorage.setItem("user", JSON.stringify(response.user))
    );
  }

  function guestLogin() {
    alert("this is for guests");
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
            <Button type="submit" variant="contained">
              Log in
            </Button>
          </Box>
        </form>
        <button onClick={guestLogin}>Guest Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </Box>
    </Box>
  );
};

export default Login;
