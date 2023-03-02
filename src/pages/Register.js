import React from "react";
import { useState } from "react";
import { app, db } from "../utils/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [RegisterData, setRegisterData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const auth = getAuth();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterData({ ...RegisterData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      RegisterData.email,
      RegisterData.password
    );
  }
  return (
    <form>
      <label>E-mail:</label>
      <input type="text" name="email" onChange={handleChange} />
      <label>Name:</label>
      <input type="text" name="name" onChange={handleChange} />
      <label>Password:</label>
      <input type="password" name="password" onChange={handleChange} />
      <button onClick={handleSubmit}>Register</button>
    </form>
  );
};

export default Register;
