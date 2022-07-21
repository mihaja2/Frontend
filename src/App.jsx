import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faSortDown,faThumbsUp,faHeart,faEllipsis,faComment,faImages,faCircleXmark,faEllipsisVertical,faHouse,faTrash,faUser,faKey } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

import Login from "./view/login/Login";
import Register from "./view/register/Register";
import ChangePass from "./view/changePass/ChangePassword";
import ChangeAdmin from "./view/changePass/ChangePassEmailAdmin";
import Home from "./view/home/Home";
import Detail from './view/detail/Detail';
import Profile from './view/profile/Profile';
import Users from './view/users/Users';
import Create from './view/Admin'
import { logout } from './context/authContext/AuthActions';
import { getProfileById } from './context/profileContext/apiCalls';
import { createUserAdmin } from './context/adminContext/apiCalls';

//font awesome (icone)
library.add(fas, faSortDown, faThumbsUp, faHeart, faEllipsis, faComment, faImages, faCircleXmark, faEllipsisVertical, faHouse, faTrash, faUser, faKey);

const App = () => {
  const { user, dispatch } = useContext(AuthContext);
  useEffect(() => {

    //creation automatique d'un admin
    async function create(){
      await createUserAdmin();
    }

    //verifie si utilisateur existe, sinon se déconnecte
    async function isUser() {  
      const profil = await getProfileById("me");
      
      if(!profil || !profil.user){
        dispatch(logout());
      }
    }
    
    create();
    isUser();
  },[dispatch]);
  
  
        
  return (
    <Router>
      <Routes>

        <Route exact path="/" element={user ? <Home/> : <Navigate replace to="/login" />}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate replace to="/" />}/>
        <Route path="/register" element={!user ? <Register/> : <Navigate replace to="/" />}/>
        <Route path="/admin/create" element={<Create/>}/>
        {!user && <Route path="*" element={<Navigate replace to="/" />} />}
        {user && (
          <>
            <Route path="/changePassword" element={<ChangePass />}/>
            <Route path="/profile/:id" element={<Profile />}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/admin/allUser" element={<Users/>}/>
            <Route path="/admin/change" element={<ChangeAdmin/>}/>

          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
