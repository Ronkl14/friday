import React from "react";
import { useState } from "react";
import { app, db } from "../utils/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginData.email, loginData.password).then(
      (response) => console.log(response)
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>E-mail:</label>
      <input type="email" name="email" onChange={handleChange} />
      <label>Password:</label>
      <input type="password" name="password" onChange={handleChange} />
      <button type="submit">Log in</button>
      <button>Guest Login</button>
      <p>
        Don't have an account? <a href="./Register.js">Register</a>
      </p>
    </form>
  );
};

export default Login;
