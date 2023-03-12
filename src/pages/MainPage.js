import React from "react";
import calcDistance from "../utils/distanceCalc";
import { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { getAuth } from "firebase/auth";
import { usePreferencesGlobalContext } from "../context/PreferencesContext";
import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [userData, setUserData] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [chosenOption, setChosenOption] = useState([]);
  const auth = getAuth();
  const { setRedirected } = usePreferencesGlobalContext();
  const [notFound, setNotFound] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const getUser = async () => {
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      setUserLocation(docData.geoPoint);
      setUserData(docData);
    };
    getUser();
  }, [auth.currentUser.uid]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const querySnapshot = await getDocs(collection(db, "places"));
      const newPlaces = [];
      querySnapshot.forEach((doc) => {
        newPlaces.push([
          doc.id,
          doc.data(),
          calcDistance(
            userLocation.latitude,
            userLocation.longitude,
            doc.data().geoPoint.latitude,
            doc.data().geoPoint.longitude
          ),
        ]);
      });
      setPlaces(newPlaces);
    };
    fetchPlaces();
  }, [userLocation]);

  useEffect(() => {
    const preferencesRange = userData.hangoutRange;
    const preferencesType = userData.hangoutType;
    const preferencesWith = userData.hangoutWith;
    const preferencesPrice = userData.priceRange;

    const filteredByRange = places.filter(
      (place) => place[2] <= preferencesRange
    );
    const filteredByType = filteredByRange.filter((place) => {
      return preferencesType.some((pref) => place[1].type.includes(pref));
    });
    const filteredByWith = filteredByType.filter((place) => {
      return preferencesWith.some((pref) => place[1].with.includes(pref));
    });
    let filteredFinal = filteredByWith;
    if (preferencesPrice === "medium") {
      filteredFinal = filteredFinal.filter(
        (place) => place[1].price === "medium" || place[1].price === "cheap"
      );
    } else if (preferencesPrice === "cheap") {
      filteredFinal = filteredFinal.filter(
        (place) => place[1].price === "cheap"
      );
    }
    setFilteredResults(filteredFinal);
  }, [
    places,
    userData.hangoutRange,
    userData.hangoutWith,
    userData.priceRange,
    userData.hangoutType,
  ]);

  function chooseOption() {
    if (filteredResults.length === 0) {
      setNotFound(
        `Couldn't find any places, maybe changing preferences will help`
      );
      return;
    }
    setNotFound("");
    const randIndex = Math.floor(Math.random() * filteredResults.length);
    setChosenOption(filteredResults[randIndex]);
    console.log(chosenOption);
  }

  function editPreferences() {
    setRedirected(true);
    navigate("/preferences");
  }

  return (
    <div>
      {chosenOption.length !== 0 ? (
        <Box sx={{ width: "30vw", m: "2rem auto" }}>
          <Card>
            <CardMedia
              component="img"
              image={chosenOption[1].photoUrl}
              height="140"
              alt="location"
            />
            <CardContent>
              <Typography>{chosenOption[1].name}</Typography>
              <Typography>{chosenOption[1].address}</Typography>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", m: "2rem" }}>
          <Typography>{notFound}</Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          width: "95vw",
          justifyContent: "center",
          m: "1rem",
        }}
      >
        <Button variant="contained" onClick={editPreferences}>
          Change Preferences
        </Button>
        <Button onClick={chooseOption} variant="contained">
          Choose for me
        </Button>
      </Box>
    </div>
  );
};

export default MainPage;
