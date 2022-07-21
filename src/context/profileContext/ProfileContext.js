import ProfileReducer from "./ProfileReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  profile: [],
  isFetching: false,
  error: false,
};

export const ProfileContext = createContext(INITIAL_STATE);

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, INITIAL_STATE);

  return (
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
