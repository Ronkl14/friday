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
      if (
        docData.hangoutRange ||
        docData.hangoutType.length !== 0 ||
        docData.hangoutWith.length !== 0 ||
        docData.location
      ) {
        navigate("/main");
      }
    })();
  }, []);

  return (
    <div>
      <p>What is your location?</p>
      <AddressInput />
      <p>Who do you usually hang out with?</p>
      <div>
        <input type="checkbox" id="myself" name="hangout-with" />
        <label htmlFor="myself">By myself</label>
      </div>
      <div>
        <input type="checkbox" id="friends" name="hangout-with" />
        <label htmlFor="friends">With my friends</label>
      </div>
    </div>
  );
};

export default Preferences;
