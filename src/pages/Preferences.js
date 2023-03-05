import React from "react";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { AddressInput } from "../components";

const Preferences = () => {
  const navigate = useNavigate();

  const [userPreferences, setUserPreferences] = useState({
    hangoutRange: null,
    hangoutType: [],
    hangoutWith: [],
    location: null,
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
  }, []);

  function savePreferences(e) {
    e.preventDefault();
  }

  function changeHandler(e) {}

  return (
    <form onSubmit={savePreferences}>
      <p>What is your location?</p>
      <AddressInput />
      <p>Set the range from your location</p>
      <input type="number" onChange={changeHandler} /> Km
      <p>Who do you usually hang out with?</p>
      <div>
        <input
          type="checkbox"
          id="myself"
          name="hangout-with"
          value="myself"
          onChange={changeHandler}
        />
        <label htmlFor="myself">By myself</label>
      </div>
      <div>
        <input type="checkbox" id="friends" name="hangout-with" />
        <label htmlFor="friends">With my friends</label>
      </div>
      <div>
        <input type="checkbox" id="partner" name="hangout-with" />
        <label htmlFor="partner">Girlfriend/Boyfriend</label>
      </div>
      <div>
        <input type="checkbox" id="family" name="hangout-with" />
        <label htmlFor="family">Family</label>
      </div>
      <p>What is your favorite hangout type?</p>
      <div>
        <input type="checkbox" id="food" name="hangout-type" />
        <label htmlFor="food">Food</label>
      </div>
      <div>
        <input type="checkbox" id="club" name="hangout-type" />
        <label htmlFor="club">Clubbing/Parties</label>
      </div>
      <div>
        <input type="checkbox" id="romantic" name="hangout-type" />
        <label htmlFor="romantic">Romantic</label>
      </div>
      <div>
        <input type="checkbox" id="culture" name="hangout-type" />
        <label htmlFor="culture">Culture</label>
      </div>
      <div>
        <input type="checkbox" id="chill" name="hangout-type" />
        <label htmlFor="chill">Chill</label>
      </div>
      <p>Select price range:</p>
      <div>
        <input type="radio" id="cheap" name="price-range" />
        <label htmlFor="cheap">Under 100 NIS</label>
      </div>
      <div>
        <input type="radio" id="medium" name="price-range" />
        <label htmlFor="medium">100-200 NIS</label>
      </div>
      <div>
        <input type="radio" id="expensive" name="price-range" />
        <label htmlFor="expensive">200+ NIS</label>
      </div>
      <button type="submit">Save my preferences</button>
    </form>
  );
};

export default Preferences;
