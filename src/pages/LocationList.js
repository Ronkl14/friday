import React from "react";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { SingleLocation } from "../components";

const LocationList = () => {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    getPlaces();
  }, []);

  async function getPlaces() {
    const querySnapshot = await getDocs(collection(db, "places"));
    const placeList = [];
    querySnapshot.forEach((doc) => placeList.push([doc.id, doc.data()]));
    setAllPlaces(placeList);
  }

  return (
    <div>
      {allPlaces.map((place) => (
        <SingleLocation
          key={place[0]}
          id={place[0]}
          name={place[1].name}
          getPlaces={getPlaces}
        />
      ))}
    </div>
  );
};

export default LocationList;
