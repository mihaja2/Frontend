import "./comments.scss";
import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import imagesUrl from "../../apiconfig/imagesUrl";
import { getProfileById } from "../../context/profileContext/apiCalls";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import Moment from 'react-moment';

import 'moment/locale/fr';
import { Link } from "react-router-dom";
import { deleteComment, getlikePostC, likePostC, updateComment } from "../../context/commentContext/apiCalls";
import { CommentContext } from "../../context/commentContext/CommentsContext";
import { deleteCommentByAdmin, updateCommentByAdmin } from "../../context/adminContext/apiCalls"
Moment.globalLocale = 'fr';

const CommentList = ({coms,setDeleteComment,setEditComment,isAdmin}) => {
    const [like,setLike] = useState(false);

    const [email,setEmail] = useState(null);
    const [id,setId] = useState(null);
    const [idUser,setIdUser] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [firstName,setFirstName] = useState(null);
    const [avatar,setAvatar] = useState(null);
    
    const [people,setPeople] = useState(null);
    const [likeNb,setLikeNb] = useState(coms.comment_likes.length);
  
    const [message,setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [isHovering, setIsHovering] = useState(false);
  
    const {dispatch} = useContext(CommentContext);

    useEffect(() => {

      async function fetchDataPost() {  
        try{
          await fetchData();
          let profile = await getProfileById(coms.user._id);
          setId(coms.user._id);
          if(profile)
            if(profile.user){
              setEmail(profile.user.email);
              setFirstName(profile.user.firstname);
              setLastName(profile.user.lastname);
              setAvatar(imagesUrl+ profile.picture);
              setMessage(coms.message);
              const isliked = await handleCheck(coms.comment_likes);
              setLike(isliked);
            }
        }catch(err){}
      }
      if(coms)
        fetchDataPost();
    }, [email,firstName,lastName]);
  
    async function fetchData() {  
      const profil = await getProfileById("me");
      if(profil){
        if(profil.user)
          setIdUser(profil.user._id);
      }
    }

    //modifier un commentaire de l'utilisateur courrant
    function handleEdit () {
      async function submitDataEdit() {  
        const mess = {"message":message};
        if(!isAdmin)
          await updateComment(coms._id,mess,dispatch);
        else
          await updateCommentByAdmin(coms._id,mess);

        setEditComment(true);
        setShow(false);
        setError(false);
      }
      if(message){
        submitDataEdit();
      }else{
        setError(true)
      }
    };

    //supprimer un commentaire de l'utilisateur courrant
    function handleDelete () {
      async function submitData() {  
        if(!isAdmin)
          await deleteComment(coms._id,dispatch);
        else
          await deleteCommentByAdmin(coms._id);
        setDeleteComment(true);
      }
      submitData();
    };

    //verifie si le commentaire a été liké ou non par l'utilisateur courrant
    async function handleCheck(commentArray) {
      const found = commentArray.some(item => item.user === idUser);
      return found;
    }

    function handleLike(){
      async function submitLike() {  
        const res = await likePostC(coms._id);
        if(res){
          setLike(!like);
          if(like){
            setLikeNb(likeNb - 1);
          }else{
            setLikeNb(likeNb + 1);
          }
        }
      }
      submitLike();
    }

    function getLike(){
      async function getPeopleLike() {  
        const res = await getlikePostC(coms._id);
        if(res){
          setPeople(res);
        }
      }
      if (likeNb !== 0)
      getPeopleLike();
    }

    //clicker boutton like pour afficher les utilisateur qui ont liké
    const handleMouseOver = () => {
      getLike();
      setIsHovering(!isHovering);
    };

  return (
    <>
    {
      lastName && firstName && email && (

        <Card className="mb-4 p-2 list-comment col-sm-10 col-md-12 container">
            <Card.Body>
                {
                    (id === idUser || isAdmin) && (
                      <>
                      <Dropdown align="end" className="dropMenu">
                        <Dropdown.Toggle>
                          <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                          <Dropdown.Item onClick={handleShow}>Modifier</Dropdown.Item>
                          <Dropdown.Item onClick={handleDelete}>Supprimer</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title className='text-muted'>Comment Edit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3 text-right" controlId="company">
                              <Form.Control
                                type="text"
                                name="message"
                                onChange={(e) => setMessage(e.target.value)}
                                value = {message}
                                required
                                autoFocus
                              />
                              {error && (
                                  <span className="small mt-1">champ obligatoire</span>
                              )} 
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Annuler
                          </Button>
                          <Button variant="info" className="text-white" onClick={handleEdit}>
                            Sauvegarder les modifications
                          </Button>
                        </Modal.Footer>
                        </Modal>


                      </>
                    )
                  }
                <Card.Text>
                    {coms.message}
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">

                        <img className="rounded-circle avatar" src={avatar} alt="avatar"/>
                        <Link to={`/profile/${id}`}>
                            <p className="small mb-0 ms-2">{lastName} {firstName}</p>
                        </Link>
                        <span className="small p-0 text-muted font-weight-normal mx-2"> • </span>
                        <span className="small p-0 text-muted font-weight-normal">                    
                            <Moment fromNow>{coms.createdAt}</Moment>
                        </span>
                    </div>
                    <div className="d-flex flex-row align-items-center text-muted">
                        <span className="like d-flex flex-row align-items-center" onClick={handleLike}>
                              <p className="small text-muted mb-0 p-0">Like</p>
                              
                              <FontAwesomeIcon icon="fa-solid fa-heart" className={`mx-2 fa-xs icons liked ${like ? "text-danger" : ""}`}/>
                                
                        </span>
                        <div>

                          <p className="small text-muted p-0 mb-0 nblike" onClick={handleMouseOver}>{likeNb}</p>
                          {isHovering && people && (
                            <div className="onHover card">
                                <ul className="small">
                                {
                                people.map((p,i) =>
                                    <li>{p.user.lastname} {p.user.firstname}</li>
                                    )}
                                </ul>
                            </div>
                          )}
                        </div>
                    </div>
                </div>

            </Card.Body>
        </Card>
      )
    }
    </>
  )
}

export default CommentList