import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { PostsContextProvider } from './context/postsContext/PostsContext';
import { ProfileContextProvider } from './context/profileContext/ProfileContext';
import App from './App';
import { CommentContextProvider } from './context/commentContext/CommentsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <ProfileContextProvider>
          <CommentContextProvider>
            <App />
          </CommentContextProvider>
        </ProfileContextProvider>
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
