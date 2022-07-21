import React, { useContext, useEffect, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useNavigate } from "react-router-dom";

import "./login.scss";
import logo from '../../assets/logo1.svg';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const history = useNavigate() ;
  
  const handleLogin = (e) => {
    e.preventDefault();
    setFormErrors(validate(email,password));
    setIsSubmit(true);
  };

  useEffect( (e) => {
    //se connecter
    async function fetchData() {
      await login({ email, password }, dispatch);
      
      //si erreur, alors, afficher un message
      setMessage("Erreur d'authentification, veuillez réessayer !");    
    }
    if(Object.keys(formErrors).length === 0 && isSubmit){
      try{
        fetchData();
      }catch(err){
        setMessage("Oops, une erreur s'est produite!");
      }
    }
  },[formErrors])

  const validate = (mail,pass) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if(!mail){
      errors.email = "Veuillez entrer une adresse email!";
    }else if(!regex.test(mail)){
      errors.email = "Veuillez entrer une adresse email valide!";
    }

    if(!pass){
      errors.password = "Veuillez entrer un mot de passe!";
    }

    return errors;
  
  };

  const routeRegister = () =>{ 
    let path = `/register`; 
    history(path, { replace: true });
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src={logo}
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form className="loginForm mt-5">
          <h1>Authentification</h1>
          {
              message && (
                <div className="small m-0 container text-warning">
                    {message}
                </div>
              )
          }
          <input
            type="email"
            placeholder="Adresse Email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="errors">{formErrors.email}</p>
          <input
            type="password"
            placeholder="Mot de passe"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="errors">{formErrors.password}</p>
          <button className="loginButton" onClick={handleLogin}>
            Se connecter
          </button>
          <span>
            Nouveau? <b onClick={routeRegister}>S'inscrire maintenant.</b>
          </span>
        </form>
      </div>
    </div>
  );
}
