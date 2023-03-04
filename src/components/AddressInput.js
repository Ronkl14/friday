import React from "react";
import { useLoadScript } from "@react-google-maps/api";

const AddressInput = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  return <div>AddressInput</div>;
};

export default AddressInput;
