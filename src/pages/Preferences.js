import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { AddressInput } from "../components";
import { Checkbox, FormControlLabel } from "@mui/material";
import { usePreferencesGlobalContext } from "../context/PreferencesContext";

const Preferences = () => {
  const navigate = useNavigate();
  const {
    userPreferences,
    setUserPreferences,
    redirected,
    setRedirected,
    afterLogin,
    setAfterLogin,
  } = usePreferencesGlobalContext();
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [firstTimeSetup, setFirstTimeSetup] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  let docData;

  useEffect(() => {
    if (!redirected) {
      navigate("/main");
    }
    (async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      docData = docSnap.data();
      setIsLoading(false);
      setUserPreferences(docData);
      console.log(userPreferences);
    })();
  }, [navigate]);

  useEffect(() => {
    if (
      afterLogin &&
      userPreferences.hangoutRange &&
      userPreferences.geoPoint.longitude &&
      userPreferences.geoPoint.latitude &&
      userPreferences.hangoutType.length !== 0 &&
      userPreferences.hangoutWith.length !== 0 &&
      userPreferences.location &&
      userPreferences.priceRange
    ) {
      navigate("/main");
      setAfterLogin(false);
    }
  }, [isLoading]);

  useEffect(() => {
    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      location: address,
    }));
  }, [address]);

  useEffect(() => {
    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      latitude: coordinates[0],
      longitude: coordinates[1],
    }));
  }, [coordinates]);

  function savePreferences(e) {
    e.preventDefault();
    setRedirected(false);
    console.log(userPreferences);
    const cityRef = doc(db, "users", auth.currentUser.uid);
    setDoc(
      cityRef,
      {
        location: userPreferences.location,
        hangoutRange: userPreferences.hangoutRange,
        hangoutType: userPreferences.hangoutType,
        hangoutWith: userPreferences.hangoutWith,
        priceRange: userPreferences.priceRange,
        geoPoint: {
          latitude: userPreferences.latitude,
          longitude: userPreferences.longitude,
        },
      },
      { merge: true }
    );
    setFirstTimeSetup(false);
    navigate("/main");
  }

  function changeHandler(e) {
    const { name, type, id, value, checked } = e.target;
    console.log(name, type, value, checked);
    const newValue =
      type === "checkbox"
        ? checked
          ? changeArray(userPreferences[name], id, "add")
          : changeArray(userPreferences[name], id, "remove")
        : value;
    console.log(newValue);
    console.log(userPreferences.hangoutWith);
    setUserPreferences({ ...userPreferences, [name]: newValue });
    console.log(userPreferences);
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

  return (
    <form onSubmit={savePreferences}>
      <p>What is your location?</p>
      <AddressInput
        setAddress={setAddress}
        setCoordinates={setCoordinates}
        passedAddress={userPreferences.location}
      />
      <p>Set the range from your location</p>
      <input
        type="number"
        name="hangoutRange"
        onChange={changeHandler}
        value={userPreferences.hangoutRange}
      />
      Km
      <p>Who do you usually hang out with?</p>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              id="myself"
              name="hangoutWith"
              value="myself"
              onChange={changeHandler}
              checked={
                userPreferences.hangoutWith
                  ? userPreferences.hangoutWith.includes("myself")
                  : false
              }
            />
          }
          label="By myself"
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="friends"
          name="hangoutWith"
          value="friends"
          onChange={changeHandler}
        />
        <label htmlFor="friends">With my friends</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="partner"
          name="hangoutWith"
          value="partner"
          onChange={changeHandler}
        />
        <label htmlFor="partner">Girlfriend/Boyfriend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="family"
          name="hangoutWith"
          value="family"
          onChange={changeHandler}
        />
        <label htmlFor="family">Family</label>
      </div>
      <p>What is your favorite hangout type?</p>
      <div>
        <input
          type="checkbox"
          id="food"
          name="hangoutType"
          value="food"
          onChange={changeHandler}
        />
        <label htmlFor="food">Food</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="club"
          name="hangoutType"
          value="club"
          onChange={changeHandler}
        />
        <label htmlFor="club">Clubbing/Parties</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="romantic"
          name="hangoutType"
          value="romantic"
          onChange={changeHandler}
        />
        <label htmlFor="romantic">Romantic</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="culture"
          name="hangoutType"
          value="culture"
          onChange={changeHandler}
        />
        <label htmlFor="culture">Culture</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="chill"
          name="hangoutType"
          value="chill"
          onChange={changeHandler}
        />
        <label htmlFor="chill">Chill</label>
      </div>
      <p>Select price range:</p>
      <div>
        <input
          type="radio"
          id="cheap"
          name="priceRange"
          value="cheap"
          onChange={changeHandler}
        />
        <label htmlFor="cheap">Under 100 NIS</label>
      </div>
      <div>
        <input
          type="radio"
          id="medium"
          name="priceRange"
          value="medium"
          onChange={changeHandler}
        />
        <label htmlFor="medium">100-200 NIS</label>
      </div>
      <div>
        <input
          type="radio"
          id="expensive"
          name="priceRange"
          value="expensive"
          onChange={changeHandler}
        />
        <label htmlFor="expensive">200+ NIS</label>
      </div>
      <button type="submit">Save my preferences</button>
    </form>
  );
};

export default Preferences;
