import React, { useState,useEffect, useRef } from "react";
import axiosClient from "../../apiconfig/apiConfig";

import "../login/login.scss";
import Navbar from "../../components/navbar/Navbar";

export default function Login() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const inputPassRef = useRef(null);
  const inputOldPassRef = useRef(null);
  const inputConfPassRef = useRef(null);

  const resetInput = () => {
    inputPassRef.current.value = null;
    inputConfPassRef.current.value = null;
    inputOldPassRef.current.value = null;
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setFormErrors(validate(oldPassword,newPassword,confPassword));
    setIsSubmit(true);
  };

  useEffect( (e) => {
    async function fetchData() {
      try{
        await axiosClient.put('/users/changepassword', {oldPassword, newPassword}, {
          headers: {
            'x-auth-token': JSON.parse(localStorage.getItem("user")).token,
          },
        });
        setMessage("Mot de passe modifié avec succès");
        setConfPassword(null);
        setNewPassword(null);
        setOldPassword(null);
        resetInput();

      }catch(err){
        setMessage("Oops, une erreur s'est produite!");
      }
    }
    if(Object.keys(formErrors).length === 0 && isSubmit){
      fetchData();
    }
  },[formErrors])

  const validate = (oldPass,pass,confPass) => {
    const errors = {};

    const mdpregex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&*])(?=.*[a-zA-Z]).{8,}$/gm;
    
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
      <div className="container">
        <form className="loginForm mt-5">
          <h5>Changer de mot de passe</h5>
          {
              message && (
                <div className="small mt-1 p-1 container rounded bg-secondary text-white">
                    {message}
                </div>
              )
          }
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
    </div>
    </>
  );
}
