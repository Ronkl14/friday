import React from "react";
import calcDistance from "../utils/distanceCalc";
import { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { getAuth } from "firebase/auth";
import { usePreferencesGlobalContext } from "../context/PreferencesContext";

const MainPage = () => {
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const [userData, setUserData] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [chosenOption, setChosenOption] = useState([]);
  const auth = getAuth();
  const { setRedirected } = usePreferencesGlobalContext();

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
      return;
    }
    const randIndex = Math.floor(Math.random() * filteredResults.length);
    setChosenOption(filteredResults[randIndex]);
    console.log(chosenOption);
  }

  return (
    <div>
      <button onClick={chooseOption}>Choose for me</button>
      {chosenOption.length !== 0 ? (
        <h2>{chosenOption[1].name}</h2>
      ) : (
        <h2>No found places</h2>
      )}
    </div>
  );
};

export default MainPage;
