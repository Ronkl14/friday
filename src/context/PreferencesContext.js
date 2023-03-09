import { createContext, useContext, useState } from "react";

const PreferencesContext = createContext();

const PreferencesProvider = ({ children }) => {
  const [userPreferences, setUserPreferences] = useState({
    hangoutRange: null,
    hangoutType: [],
    hangoutWith: [],
    priceRange: null,
    location: null,
    longitude: 0,
    latitude: 0,
  });

  const [firstTimeSetup, setFirstTimeSetup] = useState(true);
  const [redirected, setRedirected] = useState(false);
  const [afterLogin, setAfterLogin] = useState(false);

  return (
    <PreferencesContext.Provider
      value={{
        userPreferences,
        setUserPreferences,
        firstTimeSetup,
        setFirstTimeSetup,
        redirected,
        setRedirected,
        afterLogin,
        setAfterLogin,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferencesGlobalContext = () => {
  return useContext(PreferencesContext);
};

export { PreferencesProvider };
