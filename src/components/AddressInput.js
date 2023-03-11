import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useState } from "react";
import { usePreferencesGlobalContext } from "../context/PreferencesContext";
import "./a.css";

const AddressInput = ({ setAddress, passedAddress }) => {
  const [existingAddress, setExistingAddress] = useState(passedAddress);
  const { setCoordinates } = usePreferencesGlobalContext();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  function addressInputHandler(e) {
    setExistingAddress("");
    setValue(e.target.value);
  }

  async function handleSelect(address) {
    setValue(address, false);
    setAddress(address);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    setCoordinates([lat, lng]);
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        className="pref-input"
        value={existingAddress ? existingAddress : value}
        onChange={addressInputHandler}
        disabled={!ready}
        placeholder="enter your location"
      />
      <ComboboxPopover>
        <ComboboxList className="pref-drop">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                className="pref-option"
                key={place_id}
                value={description}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default AddressInput;
