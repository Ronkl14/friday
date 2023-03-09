import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { AddressInput } from "../components";
import { Checkbox, FormControlLabel, RadioGroup, Radio } from "@mui/material";
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
    coordinates,
  } = usePreferencesGlobalContext();
  const [address, setAddress] = useState("");
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
      <FormControlLabel
        control={
          <Checkbox
            id="friends"
            name="hangoutWith"
            value="friends"
            onChange={changeHandler}
            checked={
              userPreferences.hangoutWith
                ? userPreferences.hangoutWith.includes("friends")
                : false
            }
          />
        }
        label="Friends"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="partner"
            name="hangoutWith"
            value="partner"
            onChange={changeHandler}
            checked={
              userPreferences.hangoutWith
                ? userPreferences.hangoutWith.includes("partner")
                : false
            }
          />
        }
        label="Girlfriend/Boyfriend"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="family"
            name="hangoutWith"
            value="family"
            onChange={changeHandler}
            checked={
              userPreferences.hangoutWith
                ? userPreferences.hangoutWith.includes("family")
                : false
            }
          />
        }
        label="Family"
      />
      <p>What is your favorite hangout type?</p>
      <FormControlLabel
        control={
          <Checkbox
            id="food"
            name="hangoutType"
            value="food"
            onChange={changeHandler}
            checked={
              userPreferences.hangoutType
                ? userPreferences.hangoutType.includes("food")
                : false
            }
          />
        }
        label="Food"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="club"
            name="hangoutType"
            value="club"
            onChange={changeHandler}
            checked={
              userPreferences.hangoutType
                ? userPreferences.hangoutType.includes("club")
                : false
            }
          />
        }
        label="Clubbing/Parties"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="romantic"
            name="hangoutType"
            value="romantic"
            onChange={changeHandler}
            checked={
              userPreferences.hangoutType
                ? userPreferences.hangoutType.includes("romantic")
                : false
            }
          />
        }
        label="Romantic"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="culture"
            name="hangoutType"
            value="culture"
            onChange={changeHandler}
            checked={
              userPreferences.hangoutType
                ? userPreferences.hangoutType.includes("culture")
                : false
            }
          />
        }
        label="Culture"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="chill"
            name="hangoutType"
            value="chill"
            onChange={changeHandler}
            checked={
              userPreferences.hangoutType
                ? userPreferences.hangoutType.includes("chill")
                : false
            }
          />
        }
        label="Chill"
      />
      <p>Select price range:</p>
      <FormControlLabel
        control={
          <Radio
            id="cheap"
            name="priceRange"
            value="cheap"
            onChange={changeHandler}
            checked={
              userPreferences.priceRange
                ? userPreferences.priceRange.includes("cheap")
                : false
            }
          />
        }
        label="Under 100 NIS"
      />
      <FormControlLabel
        control={
          <Radio
            id="medium"
            name="priceRange"
            value="medium"
            onChange={changeHandler}
            checked={
              userPreferences.priceRange
                ? userPreferences.priceRange.includes("medium")
                : false
            }
          />
        }
        label="100-200 NIS"
      />
      <FormControlLabel
        control={
          <Radio
            id="expensive"
            name="priceRange"
            value="expensive"
            onChange={changeHandler}
            checked={
              userPreferences.priceRange
                ? userPreferences.priceRange.includes("expensive")
                : false
            }
          />
        }
        label="200+ NIS"
      />
      <button type="submit">Save my preferences</button>
    </form>
  );
};

export default Preferences;
