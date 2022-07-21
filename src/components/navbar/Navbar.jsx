import React, { useContext, useState, useEffect } from "react";
import "./navbar.scss";

//logo
import logo from '../../assets/logo2.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";
import { Navbar, Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { getProfileById } from "../../context/profileContext/apiCalls";
import imagesUrl from "../../apiconfig/imagesUrl";

// barre de navigation
const NavbarComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [avatar,setAvatar] = useState(null);
  const [isAdmin,setAdmin] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  async function fetchData() {  
    const profil = await getProfileById("me");
    if(profil){
      setAvatar(imagesUrl+ profil.picture);
      if(profil.user.role === "admin")
        setAdmin(true);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
      <Navbar variant="dark" expand="sm" className={isScrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to="/">
              <img src={logo} alt="" className="logo" srcset="" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/">
              <FontAwesomeIcon icon="fa-solid fa-house"/>
                <span>Accueil</span>
              </Link>
              {
                isAdmin &&(
                <Link className="nav-link" to="/admin/allUser">
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                  <span>Utilisateurs</span>
                </Link>

                )
              }
              <NavDropdown 
              title={
                  <img className="thumbnail-image" 
                      src={avatar} 
                      alt="user"
                  />
              } 
              id="dropdown-menu-align-end"
              align="end"
              className="profile">
                <Link className="dropdown-item" to="/profile/me">
                  <span>Mon profile</span>
                </Link>
                <Link className="dropdown-item" to="/changePassword">
                  <span>Mot de passe</span>
                </Link>
                {
                  isAdmin && (
                    <Link className="dropdown-item" to="/admin/change">
                      <span>Changer Admin</span>
                    </Link>
                  )
                }
                <NavDropdown.Divider />
                <Link className="logout dropdown-item" to="/" onClick={() => dispatch(logout())}>
                  Logout
                </Link>
              </NavDropdown>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavbarComponent;
