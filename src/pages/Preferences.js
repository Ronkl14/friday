import React from "react";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const Preferences = () => {
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
      setUserPreferences({ ...userPreferences });
    })();
  }, []);

  return <div>Preferences</div>;
};

export default Preferences;
