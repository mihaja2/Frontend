import "./register.scss";
import axiosClient from "../../apiconfig/apiConfig";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

import logo from '../../assets/logo1.svg';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState('male');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const { dispatch } = useContext(AuthContext);
  const history = useNavigate();

  const handleFinish = async (e) => {
    e.preventDefault();
    setFormErrors(validate(gender,email,password,confPassword,lastname,firstname));
    setIsSubmit(true);
  };

  useEffect( (e) => {
    async function fetchData() {
      //s'incrire
      await axiosClient.post("users/signup", { firstname, lastname, email, password, phonenumber, gender });
      //se connecter
      await login({ email, password }, dispatch);
    }
    
    if(Object.keys(formErrors).length === 0 && isSubmit){
      try{
        fetchData();
      }catch(err){
        setMessage("Oops, une erreur s'est produite!");
      }
    }
  },[formErrors])

  //validation des champs avec regex
  const validate = (genre,mail,pass,confPass,name,first) => {
    const errors = {};

    const mdpregex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&*])(?=.*[a-zA-Z]).{8,}$/gm;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if(!mail){
      errors.email = "Veuillez entrer une adresse email!";
    }else if(!regex.test(mail)){
      errors.email = "Veuillez entrer une adresse email valide!";
    }

    if(!genre){
      errors.gender = "Veuillez entrer un genre!";
    }else if(genre !== "male" && genre !== "female" && genre !== "others"){
      errors.gender = "Veuillez entrer un genre valide!";
    }

    if(!name){
      errors.lastname = "Veuillez entrer votre nom!";
    }

    if(!first){
      errors.firstname = "Veuillez entrer votre prénom";
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

  const routeLogin= () =>{ 
    let path = `/login`; 
    history(path, { replace: true });
  }

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src={logo}
            alt=""
          />
          <button className="loginButton" onClick={routeLogin}>Se connecter</button>
        </div>
      </div>
      <div className="contenu">
            
            <form className="userForm text-center">
            <h1>Inscription</h1>
              {message?(
                <span class="small text-warning mt-1"> {message} </span>
                ):""}

              <div className="my-1">
                <input name="gender" type="radio" id="male" defaultChecked={true} value="male" onClick={() => setGender('male')} />
                <label htmlFor="male" className="m-2">Homme</label>
                <input name="gender" id="female" type="radio" value="female" onClick={() => setGender('female')} />
                <label htmlFor="female" className="m-2">Femme</label>
                <input name="gender" id="others" type="radio" value="others" onClick={() => setGender('others')} />
                <label htmlFor="others" className="m-2">Autres</label>
              </div>

              <p className="errors">{formErrors.gender}</p>
              <input 
                type="lastname" 
                className="form-control" 
                placeholder="Nom utilisateur" 
                onChange={(e) => setLastname(e.target.value)}
                required
              />
              <p className="errors">{formErrors.lastname}</p>
              <input 
                type="firstname" 
                className="form-control" 
                placeholder="Prénom utilisateur" 
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <p className="errors">{formErrors.firstname}</p>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Adresse Email" 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="errors">{formErrors.email}</p>
              <input 
                type="phonenumber" 
                className="form-control" 
                placeholder="Numéro téléphone" 
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="errors"></p>
              
              <input 
                type="password"
                className="form-control" 
                placeholder="Mot de passe" 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="errors">{formErrors.password}</p>
              
              <input 
                type="password" 
                className="form-control" 
                placeholder="Confirmation mot de passe" 
                onChange={(e) => setConfPassword(e.target.value)}
                required
              />
              <p className="errors">{formErrors.confirmation}</p>
              <button type="button" className="registerButton" onClick={handleFinish}>
                Commencer
              </button>
            </form>
            
      </div>
    </div>
  );
}
