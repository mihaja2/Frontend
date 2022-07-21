import './posts.scss'
import React, {useEffect, useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { getProfileById } from '../../context/profileContext/apiCalls'
import imagesUrl from '../../apiconfig/imagesUrl';
import { deletePost, getlikePost, likePost, updatePost } from '../../context/postsContext/apiCalls'
import { PostsContext } from '../../context/postsContext/PostsContext'

import { deletePostByAdmin, updatePostByAdmin } from '../../context/adminContext/apiCalls'
import Swal from 'sweetalert2'

// moment js ; convertit la date de publication en (il y a 2h ou à l'instant)
import Moment from 'react-moment';
import 'moment/locale/fr';
Moment.globalLocale = 'fr';

const Posts = ({ post,setDeletePost,setEditPost,isAdmin }) => {
  
  const [email,setEmail] = useState(null);
  const [id,setId] = useState(null);
  const [idUser,setIdUser] = useState(null);
  const [lastName,setLastName] = useState(null);
  const [firstName,setFirstName] = useState(null);
  const [avatar,setAvatar] = useState(null);

  const [people,setPeople] = useState(null);
  const [likeNb,setLikeNb] = useState(post.post_likes.length);

  const [like,setLike] = useState(false);

  const [message,setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [isHovering, setIsHovering] = useState(false);

  const {dispatch} = useContext(PostsContext);

  useEffect(() => {
    async function fetchDataPost() {
      await fetchData();

      let profile = null;
      if(post.user._id){
        profile = await getProfileById(post.user._id);
        setId(post.user._id);
      }else{
        profile = await getProfileById(post.user);
        setId(post.user);
      }
      if(profile)
        if(profile.user){
          setEmail(profile.user.email);
          setFirstName(profile.user.firstname);
          setLastName(profile.user.lastname);
          setAvatar(imagesUrl+ profile.picture);
          setMessage(post.message);
          
        }
    }
    if(post){
      fetchDataPost();
      let isliked = handleCheck(post.post_likes);
      setLike(isliked);
    }
  }, [email,firstName,lastName]);

  async function fetchData() {
    const profil = await getProfileById("me");
    if(profil){
      setIdUser(profil.user._id);
    }
  }
  
  function handleDelete () {
    async function submitData() {
      if(!isAdmin)
        await deletePost(post._id,dispatch);
      else
        await deletePostByAdmin(post._id);
      setDeletePost(true);
    }
    Swal.fire({
      title: 'Voulez vous ce post?',
      icon: 'question',
      showCancelButton:true,
      confirmButtonText: 'Delete',
      }).then((willDelete) => {
        if(willDelete.isConfirmed){        
          submitData();
        }
      });
  };
  
  function handleEdit () {
    async function submitDataEdit() {  
      const mess = {"message":message};
      if(!isAdmin)
        await updatePost(post._id,mess,dispatch);
      else
        await updatePostByAdmin(post._id,mess);
      setEditPost(true);
      setShow(false);
      setError(false);
    }
    if(message){
      submitDataEdit();
    }else{
      setError(true)
    }
  };

  function handleLike(){
    async function submitLike() {  
      const res = await likePost(post._id);
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

  function handleCheck(postArray) {
    let found = postArray.some(item => item.user === idUser);
    return found;
  }

  function getLike(){
    async function getPeopleLike() {  
      const res = await getlikePost(post._id);
      if(res){
        setPeople(res);
      }
    }
    if (likeNb !== 0)
    getPeopleLike();
  }


  const handleMouseOver = () => {
    getLike();
    setIsHovering(!isHovering);
  };

  return (
      <section className='posts container my-5'>
        {email && firstName && lastName && (
        <div>
        <Card className="col-md-10 col-sm-12 container">
          <Card.Body className="p-4">
            <div className="d-flex mb-3">
             
              <img src={avatar} className="rounded-circle avatar"
                alt="Avatar" />
              <div>
                <span className="text-dark mb-0">
                  <Link to={`/profile/${id}`}>
                    <strong>{lastName} {firstName}</strong>
                  </Link>
                </span>
                <p className="text-muted d-block">
                  <span className="small p-0 text-muted font-weight-normal">{email}</span>
                  <span className="small p-0 text-muted font-weight-normal mx-2"> • </span>
                  <span className="small p-0 text-muted font-weight-normal">                    
                    <Moment fromNow>{post.createdAt}</Moment>
                  </span>
                </p>
              </div>
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
                      <Modal.Title className='text-muted'>Post Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3 text-right" controlId="company">
                          <Form.Control
                            type="text"
                            name="message"
                            onChange={(e) => setMessage(e.target.value)}
                            defaultValue = {message}
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
                      <Button variant="primary" onClick={handleEdit}>
                        Sauvegarder les modifications
                      </Button>
                    </Modal.Footer>
                    </Modal>
                  </>
                )
              }
              
            </div>

            

            <div>
              <p>
                {post.message}
              </p>
            </div>
          </Card.Body>
          {
            post.picture && (
            <div className="bg-image px-4">
              <img src={imagesUrl + post.picture} className="w-100" alt='Post'/>
            </div>
              
            )
          }
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between mb-3">
              <div className='pleft'>
                  
                  <FontAwesomeIcon icon="fa-solid fa-heart" className={`icons ${like ? "text-danger" : ""}`} onClick={handleLike}/>
                  
                  <>
                  <span className=" text-muted p-0 mb-0 nblike" onClick={handleMouseOver}>{likeNb}</span>
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
                  </>
              </div>
              <div className='pright'>
                <Link to={"/detail/"+ post._id}>
                  <FontAwesomeIcon icon="fa-solid fa-comment" className="icons"/>
                  <span>{post.comments.length} comments</span>
                </Link>
              </div>
            </div>
          </Card.Body>
        </Card>
        

        </div>

        )}
      </section>
  )
}

export default Posts