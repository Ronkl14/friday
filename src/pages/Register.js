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
import { TextField, Button, Box } from "@mui/material";
import registerImg from "../assets/img/register-page.jpg";

const Register = () => {
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
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
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
