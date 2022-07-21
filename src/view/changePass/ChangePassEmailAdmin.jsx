import React, { useState,useEffect, useRef } from "react";
import axiosClient from "../../apiconfig/apiConfig";

import "../login/login.scss";
import Navbar from "../../components/navbar/Navbar";
import { changePassEmailForAdmin } from "../../context/adminContext/apiCalls";
import { getProfileById } from "../../context/profileContext/apiCalls";

export default function ChangePassEmailAdmin() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const inputEmail = useRef(null);
  const inputPassRef = useRef(null);
  const inputOldPassRef = useRef(null);
  const inputConfPassRef = useRef(null);
  const [isAdmin,setAdmin] = useState(false);

  async function fetchDataMe() {  
    const profil = await getProfileById("me");
    if(profil){
      if(profil.user.role === "admin")
        setAdmin(true);
    }
  }

  const resetInput = () => {
    inputEmail.current.value = null;
    inputPassRef.current.value = null;
    inputConfPassRef.current.value = null;
    inputOldPassRef.current.value = null;

  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setFormErrors(validate(email,oldPassword,newPassword,confPassword));
    setIsSubmit(true);
  };

  useEffect( (e) => {
    async function fetchData() {
      try{
        await changePassEmailForAdmin({email,oldPassword, newPassword});
        setMessage("Informations modifié avec succès");
        setEmail(null);
        setConfPassword(null);
        setNewPassword(null);
        setOldPassword(null);
        setFormErrors({})
        resetInput();
        setIsSubmit(false);
      }catch(err){
        setMessage("Oops, une erreur s'est produite!");
      }
    }
    fetchDataMe();
    if(Object.keys(formErrors).length === 0 && isSubmit){
      fetchData();
    }
  },[formErrors])

  const validate = (mail,oldPass,pass,confPass) => {
    const errors = {};

    const mdpregex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&*])(?=.*[a-zA-Z]).{8,}$/gm;
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if(!mail){
      errors.email = "Veuillez entrer une adresse email!";
    }else if(!regex.test(mail)){
      errors.email = "Veuillez entrer une adresse email valide!";
    }

    if(!oldPass){
      errors.oldpassword = "Veuillez entrer un mot de passe!";
    }

    if(!pass){
      errors.password = "Veuillez entrer un mot de passe!";
    }else if(!mdpregex.test(pass)){
      errors.password = "Le mot de passe doit : être supérieur à 8 caractères, contenir au moins 1 Majuscule, 1 Minuscule, 1 chiffre et 1 caractère spécial -#$.%&*";
    }

    if(pass !== confPass){
      errors.confirmation = "Le mot de passe ne correspond pas!";
    }

    return errors;
  
  };

  return (
    <>
    <div className="login change">
      <Navbar />
      {
          isAdmin && (
            <div className="container">
            <form className="loginForm mt-5">
            <h5>Changer les informations de l'adminstrateur</h5>
            {
                message && (
                    <div className="small mt-1 p-1 container rounded bg-secondary text-white">
                        {message}
                    </div>
                )
            }
            <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={inputEmail}
            />
            <p className="errors">{formErrors.email}</p>
            <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                ref={inputOldPassRef}
            />
            <p className="errors">{formErrors.oldpassword}</p>
            <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                ref={inputPassRef}
            />
            <p className="errors">{formErrors.password}</p>
            <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfPassword(e.target.value)}
                value={confPassword}
                ref={inputConfPassRef}
            />
            <p className="errors">{formErrors.confirmation}</p>
            <button className="loginButton" onClick={handleFinish}>
                Modifier
            </button>
            </form>
        </div>
        )
      }
      
    </div>
    </>
  );
}
