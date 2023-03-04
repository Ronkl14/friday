import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import { app, db } from "../utils/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>E-mail:</label>
        <input type="email" name="email" onChange={handleChange} />
        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Log in</button>
      </form>
      <button onClick={guestLogin}>Guest Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
