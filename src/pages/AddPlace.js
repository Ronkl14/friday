import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import {
  FormControlLabel,
  Checkbox,
  Typography,
  Radio,
  Box,
  Button,
} from "@mui/material";
import { AddressInput } from "../components";
import { usePreferencesGlobalContext } from "../context/PreferencesContext";

const AddPlace = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    name: "",
    address: "",
    with: [],
    type: [],
    price: "",
    geoPoint: { latitude: 0, longitude: 0 },
  });
  const [address, setAddress] = useState("");
  const { coordinates } = usePreferencesGlobalContext();

  useEffect(() => {
    console.log(location);
    setAddress(location.address);
  }, [location]);

  useEffect(() => {
    setLocation((prevDetails) => ({
      ...prevDetails,
      address: address,
    }));
  }, [address]);

  useEffect(() => {
    setLocation((prevDetails) => ({
      ...prevDetails,
      geoPoint: {
        latitude: coordinates[0],
        longitude: coordinates[1],
      },
    }));
  }, [coordinates]);

  function changeHandler(e) {
    const { name, type, id, value, checked } = e.target;
    console.log(name, type, value, checked);
    const newValue =
      type === "checkbox"
        ? checked
          ? changeArray(location[name], id, "add")
          : changeArray(location[name], id, "remove")
        : value;
    console.log(newValue);
    setLocation({ ...location, [name]: newValue });
    console.log(location);
  }

  function changeArray(array, value, action) {
    switch (action) {
      case "add":
        array.push(value);
        return array;
      case "remove":
        const index = array.indexOf(value);
        array.splice(index, 1);
        return array;
      default:
        return;
    }
  }

  function saveLocation(e) {
    e.preventDefault();
    // const locationRef = doc(db, "places", id);
    // setDoc(
    //   locationRef,
    //   {
    //     name: location.name,
    //     address: location.address,
    //     type: location.type,
    //     with: location.with,
    //     price: location.price,
    //     geoPoint: {
    //       latitude: location.geoPoint.latitude,
    //       longitude: location.geoPoint.longitude,
    //     },
    //   },
    //   { merge: true }
    // );
    async function addPlace() {
      const docRef = await addDoc(collection(db, "places"), {
        name: location.name,
        address: location.address,
        type: location.type,
        with: location.with,
        price: location.price,
        geoPoint: {
          latitude: location.geoPoint.latitude,
          longitude: location.geoPoint.longitude,
        },
      });
    }
    addPlace();
    navigate("/location-list");
  }

  return (
    <form onSubmit={saveLocation}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          className="pref-input"
          value={location.name}
          onChange={changeHandler}
        />
      </div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Address: </Typography>
        <AddressInput setAddress={setAddress} passedAddress={address} />
      </Box>
      <Typography>With:</Typography>
      <FormControlLabel
        control={
          <Checkbox
            id="myself"
            name="with"
            value="myself"
            onChange={changeHandler}
          />
        }
        label="By myself"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="friends"
            name="with"
            value="friends"
            onChange={changeHandler}
          />
        }
        label="Friends"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="partner"
            name="with"
            value="partner"
            onChange={changeHandler}
          />
        }
        label="Girlfriend/Boyfriend"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="family"
            name="with"
            value="family"
            onChange={changeHandler}
          />
        }
        label="Family"
      />
      <Typography>Type:</Typography>
      <FormControlLabel
        control={
          <Checkbox
            id="food"
            name="type"
            value="food"
            onChange={changeHandler}
          />
        }
        label="Food"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="club"
            name="type"
            value="club"
            onChange={changeHandler}
          />
        }
        label="Clubbing/Parties"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="romantic"
            name="type"
            value="romantic"
            onChange={changeHandler}
          />
        }
        label="Romantic"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="culture"
            name="type"
            value="culture"
            onChange={changeHandler}
          />
        }
        label="Culture"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="chill"
            name="type"
            value="chill"
            onChange={changeHandler}
          />
        }
        label="Chill"
      />
      <Typography>Price range:</Typography>
      <FormControlLabel
        control={
          <Radio
            id="cheap"
            name="price"
            value="cheap"
            onChange={changeHandler}
          />
        }
        label="Under 100 NIS"
      />
      <FormControlLabel
        control={
          <Radio
            id="medium"
            name="price"
            value="medium"
            onChange={changeHandler}
          />
        }
        label="100-200 NIS"
      />
      <FormControlLabel
        control={
          <Radio
            id="expensive"
            name="price"
            value="expensive"
            onChange={changeHandler}
          />
        }
        label="200+ NIS"
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddPlace;
