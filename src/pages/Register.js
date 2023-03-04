import React from "react";
import { useState } from "react";
// eslint-disable-next-line
import { app, db } from "../utils/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

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
        hangoutWith: [],
        hangoutType: [],
        hangoutRange: null,
      });
      return updateProfile(user, { displayName: registerData.name });
    });
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
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
