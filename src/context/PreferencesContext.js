import { createContext, useContext } from "react";

const PreferencesContext = createContext();

const PreferencesProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  return (
    <PreferencesContext.Provider value={{}}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferencesGlobalContext = () => {
  return useContext(PreferencesContext);
};

export { PreferencesProvider };
