// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxPopover,
// } from "@reach/combobox";
// import React from "react";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

// const AddressInput = ({ setAddress }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   function addressInputHandler(e) {
//     setValue(e.target.value);
//   }

//   async function handleSelect(address) {
//     setValue(address, false);
//     setAddress(address);
//     clearSuggestions();

//     const results = await getGeocode({ address });
//     const { lat, lng } = getLatLng(results[0]);
//     console.log("geocode:", lat, lng);
//   }

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={addressInputHandler}
//         disabled={!ready}
//         placeholder="enter your location"
//       />
//       <ComboboxPopover>
//         <ComboboxList style={{ backgroundColor: "white" }}>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };

// export default AddressInput;
