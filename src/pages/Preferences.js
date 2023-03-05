import React from "react";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { AddressInput } from "../components";

const Preferences = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const [userPreferences, setUserPreferences] = useState({
    hangoutRange: null,
    hangoutType: [],
    hangoutWith: [],
    priceRange: null,
    location: null,
    longitude: 0,
    latitude: 0,
  });

  const auth = getAuth();
  const docRef = doc(db, "users", auth.currentUser.uid);

  useEffect(() => {
    (async () => {
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();

      console.log(docData);
      console.log(docData.geoPoint.latitude);
      console.log(docData.geoPoint.longitude);

      if (
        docData.hangoutRange &&
        docData.hangoutType.length !== 0 &&
        docData.hangoutWith.length !== 0 &&
        docData.location &&
        docData.geoPoint.latitude !== 0 &&
        docData.geoPoint.longitude !== 0
      ) {
        navigate("/main");
      }
    })();
  }, [docRef, navigate]);

  useEffect(() => {
    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      location: address,
    }));
  }, [address]);

  function savePreferences(e) {
    e.preventDefault();
    console.log(userPreferences);
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
      <AddressInput setAddress={setAddress} />
      <p>Set the range from your location</p>
      <input
        type="number"
        name="hangoutRange"
        onChange={changeHandler}
        value={userPreferences.hangoutRange || ""}
      />
      Km
      <p>Who do you usually hang out with?</p>
      <div>
        <input
          type="checkbox"
          id="myself"
          name="hangoutWith"
          value="myself"
          onChange={changeHandler}
        />
        <label htmlFor="myself">By myself</label>
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
