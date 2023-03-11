import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const EditPlace = () => {
  const { id } = useParams();
  const [location, setLocation] = useState({});

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "places", id);
      const docSnap = await getDoc(docRef);
      setLocation(docSnap.data());
    })();
  }, []);

  return (
    <div>
      <p>{id}</p>
      <p>{location.name}</p>
    </div>
  );
};

export default EditPlace;
