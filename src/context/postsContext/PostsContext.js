import PostsReducer from "./PostsReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  posts: [],
  isFetching: false,
  error: false,
};

export const PostsContext = createContext(INITIAL_STATE);

export const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostsReducer, INITIAL_STATE);

  return (
    <PostsContext.Provider
      value={{
        posts: state.posts,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
