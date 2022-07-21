import './profileHeader.scss'
import React, {useState, useRef, useContext, useEffect} from 'react'

import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProfileContext } from '../../context/profileContext/ProfileContext'
import { createProfile, deleteCurrent } from '../../context/profileContext/apiCalls'
import { getProfileById } from '../../context/profileContext/apiCalls'
import imagesUrl from "../../apiconfig/imagesUrl";
import Swal from 'sweetalert2'
import { AuthContext } from '../../context/authContext/AuthContext'

const ProfileHeader = ({id}) => {
  const inputRef = useRef(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [companyError, setCompanyError] = useState(false);
  

  const [email,setEmail] = useState(null);
  const [lastName,setLastName] = useState(null);
  const [firstName,setFirstName] = useState(null);
  const [avatar,setAvatar] = useState(null);
  const [company,setCompany] = useState(null);
  const [status,setStatus] = useState(null);
  const [location,setLocation] = useState(null);
  const [bio,setBio] = useState(null);
  const [submit,setSubmit] = useState(false);

  const { dispatch } = useContext(ProfileContext);

  const {dispatch:dispatchAuth } = useContext(AuthContext);

  const [thisId,setId] = useState(null);
  const [idUser,setIdUser] = useState(null);

  //profile de l'utilisateur
  useEffect(() => {
    async function fetchData() {  
      const profil = await getProfileById(id);
      if(profil){
        setId(profil.user._id)

        setEmail(profil.user.email);
        setFirstName(profil.user.firstname);
        setLastName(profil.user.lastname);
        setCompany(profil.company);
        setBio(profil.bio);
        setAvatar(imagesUrl+ profil.picture);
        setLocation(profil.location)
        setStatus(profil.status)
        setSubmit(false);
      }
    }
    fetchData();
    fetchDataUser();
  }, [submit]);
  
  const handleChange = (e) => {
    const value = e.target.value;
    
    setProfile({ ...profile, [e.target.name]: value });
    
  };

  async function fetchDataUser() {  
    const profil = await getProfileById("me");
    if(profil){
      setIdUser(profil.user._id);
    }
  }

  const handleImage = (e) => {
    const value = e.target.files[0];
    setImage(value);
    setProfile({ ...profile, [e.target.name]: value });
  };

  const resetFileInput = () => {
    inputRef.current.value = null;
    setImage(null);
    setProfile({ ...profile, picture: null });
  };

  const deleteCurrentUser = () => {
    Swal.fire({
      title: 'Etes-vous sûre de supprimer votre compte?',
      icon: 'question',
      showCancelButton:true,
      confirmButtonText: 'Delete',
    }).then((willDelete) => {
      if(willDelete.isConfirmed){
        deleteCurrent(dispatchAuth);
      }
    });
  };

  //creer ou modifier le profile d'un utilisateur
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!profile.company && company)
      profile.company=company;
    if(profile.company){
      createProfile(profile, dispatch);
      setCompanyError(false);
      setShow(false);
      setProfile(null);
      setSubmit(true);
    }else{
      setCompanyError(true)
    }
  };

  return (
    <section className="profileHeader">
        <div className="container py-3">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12">
                <Card className="col-md-8 col-sm-10 container">
                    <Card.Body className="p-4 text-center">
                        

                        <div className="mt-3 mb-4">
                        <img src={avatar}
                            className="rounded-circle img-fluid avatar"/>
                        </div>
                        <h4 className="mb-2">{lastName} {firstName}</h4>
                        <p className="small my-1">{email}</p>
                        <p className="text-muted my-1">{company}<span className="mx-2">|</span> {location}</p>
                        <div className='text-muted my-1'>
                            {status}
                        </div>  
                        <div className='text-muted mb-4'>
                            {bio}
                        </div>  
                        {
                          thisId === idUser && (
                          <>
                            <FontAwesomeIcon icon="fa-solid fa-trash"  onClick={deleteCurrentUser} className='deleteProfile btn'/>

                            <Button variant="primary" onClick={handleShow}>
                                Modifier Profile
                            </Button>


                            <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Profile Edit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group className="mb-3 text-center" controlId="picture">
                                  <Form.Label>Photo de profile : </Form.Label>
                                  {image && (
                                      <FontAwesomeIcon icon="fa-solid fa-circle-xmark" onClick={resetFileInput} className='text-danger mb-1 ml-1 btn'/>
                                  )} 
                                  <Form.Control
                                    type="file"
                                    name="picture"  
                                    accept=".png, .jpg, .jpeg"
                                    ref={inputRef}
                                    onChange={handleImage}
                                    autoFocus
                                  />
                                  
                                </Form.Group>
                                <Form.Group className="mb-3 text-right" controlId="company">
                                  <Form.Control
                                    type="text"
                                    name="company"
                                    onChange={handleChange}
                                    placeholder="Société"
                                    defaultValue = {company}
                                    required
                                    autoFocus
                                  />
                                  {companyError && (
                                      <span className="small mt-1">champ obligatoire</span>
                                  )} 
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="location">
                                  <Form.Control
                                    type="text"
                                    name="location"
                                    onChange={handleChange}
                                    placeholder="Adresse"
                                    defaultValue = {location}
                                    autoFocus
                                  />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="status">
                                  <Form.Control
                                    type="text"
                                    name="status"
                                    onChange={handleChange}
                                    placeholder="Situation maritale"
                                    defaultValue = {status}
                                    autoFocus
                                  />
                                </Form.Group>
                                
                                <Form.Group
                                  className="mb-3"
                                  controlId="bio"
                                >
                                  <Form.Control as="textarea" 
                                    placeholder="Bio" 
                                    rows={2} 
                                    name="bio"
                                    defaultValue = {bio}
                                    onChange={handleChange}
                                    />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={handleSubmit}>
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>

                          </>
                        )}
                    </Card.Body>
                </Card>
            </div>
            </div>
        </div>

    </section>
  )
}

export default ProfileHeader