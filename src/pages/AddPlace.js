import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  FormControlLabel,
  Checkbox,
  Typography,
  Radio,
  Box,
  Button,
  Paper,
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
    photoUrl: "",
  });
  const [address, setAddress] = useState("");
  const { coordinates } = usePreferencesGlobalContext();

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
    async function addPlace() {
      const docRef = await addDoc(collection(db, "places"), {
        name: location.name,
        address: location.address,
        type: location.type,
        with: location.with,
        price: location.price,
        photoUrl: location.photoUrl,
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
    <Box sx={{ p: "0 28rem", m: "1rem" }}>
      <Paper sx={{ p: "0 1rem" }} elevation={5}>
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
          <div>
            <label htmlFor="photo">Photo Url: </label>
            <input
              type="text"
              id="photo"
              name="photoUrl"
              className="pref-input"
              value={location.photoUrl}
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
          <div>
            <Button variant="contained" type="submit" sx={{ m: "1rem" }}>
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </Box>
  );
};

export default AddPlace;
