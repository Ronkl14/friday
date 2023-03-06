import React from "react";
import calcDistance from "../utils/distanceCalc";
import { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { getAuth } from "firebase/auth";

const MainPage = () => {
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState({});
  const auth = getAuth();

  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const getUser = async () => {
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      setUserLocation(docData.geoPoint);
    };
    getUser();
  }, [auth.currentUser.uid]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const querySnapshot = await getDocs(collection(db, "places"));
      const newPlaces = [];
      querySnapshot.forEach((doc) => {
        console.log(userLocation);

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
      console.log(newPlaces);
    };
    fetchPlaces();
  }, [userLocation]);

  return (
    <div>
      {places.map((place) => (
        <p key={place[0]}>{place[1].name}</p>
      ))}
    </div>
  );
};

export default MainPage;
