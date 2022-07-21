import "./home.scss";
import "../../components/Posts/posts.scss";
import React, { useEffect, useContext, useState, useRef } from "react";
import Card from 'react-bootstrap/Card'
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/Posts/Posts";
import { PostsContext } from "../../context/postsContext/PostsContext";
import { getPosts,createPost } from "../../context/postsContext/apiCalls";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getProfileById } from "../../context/profileContext/apiCalls";
import imagesUrl from "../../apiconfig/imagesUrl";

const Home = ({ type }) => {
  const { posts, dispatch } = useContext(PostsContext);

  // Add Posts

  const inputRef = useRef(null);
  const inputPostRef = useRef(null);
  const [newposts, setPosts] = useState(null);
  const [image, setImage] = useState(null);
  const [avatar,setAvatar] = useState(null);

  const [deletePost, setDeletePost]=useState(false);
  const [editPost, setEditPost]=useState(false);
  const [isAdmin,setAdmin] = useState(false);


  const handleChange = (e) => {
      const value = e.target.value;
      if(!value){
          setPosts(null)
      }else{
          setPosts({ ...newposts, [e.target.name]: value });
      }
  };

  const handleImage = (e) => {
      const value = e.target.files[0];
      setImage(value);
      setPosts({ ...newposts, [e.target.name]: value });
  };

  const resetFileInput = () => {
      inputRef.current.value = null;
      setImage(null);
      setPosts({ ...newposts, picture: null });
    };

  const resetPostInput = () => {
    inputPostRef.current.value = null;
    setPosts({ ...newposts, message: null });
  };

  
  const handleSubmit = (e) => {
    async function submitData() {  
      // crée une publication
      await createPost(newposts, dispatch);

      // liste de l'actualité
      await getPosts(dispatch);

      // rendre les champs vide après avoir publié
      resetFileInput();
      resetPostInput();
      setPosts(null);
      
    }
    e.preventDefault();
    submitData();
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
    getPosts(dispatch);
    fetchData();
    setDeletePost(false);
    setEditPost(false)
  }, [dispatch,deletePost,editPost]);

  return (
    <div className="home">
      <Navbar />
      <div className="newsfeed">

          <section className="addPosts">
            <Card className="col-md-8 col-sm-10 container">
              <Card.Body className="p-4">
                <div className="d-flex">
                    <img src={avatar} className="rounded-circle postAvatar"
                    height="50" alt="Avatar" loading="lazy" />
                    <div className="d-flex align-items-center w-100 ps-3">
                        <div className="w-100">
                            <input type="text" 
                            id="message"
                            name="message" 
                            className="form-status border-0 py-1 px-0 w-100"
                            placeholder="A quoi pensez-vous ?"
                            onChange={handleChange}
                            ref={inputPostRef}
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <ul className="list-unstyled d-flex flex-row ps-3 pt-3">
                    <li>
                        <label htmlFor='picture'>
                            <FontAwesomeIcon icon="fa-solid fa-images"/>
                            <span className='ml-2'>Photos</span>
                        </label>
                        
                        <input type="file" 
                        className='form-control imageUpload' 
                        id="picture"
                        name="picture"  
                        accept=".png, .jpg, .jpeg"
                        ref={inputRef}
                        onChange={handleImage}
                        autoFocus
                        />

                        {image && (
                            <FontAwesomeIcon icon="fa-solid fa-circle-xmark" onClick={resetFileInput} className='text-danger'/>
                        )} 
                    </li>
                    </ul>
                    {newposts && (
                        <div className="d-flex align-items-center">
                            <button type="button" className="btn btn-secondary" onClick={handleSubmit} >Publier</button>
                        </div>
                    )} 
                </div>
              </Card.Body>
            </Card>
        </section>

        {
          posts && (
            posts.map((post,i) =>
              <Posts  
                post={post}
                key={i}
                setDeletePost={setDeletePost}
                setEditPost={setEditPost}
                isAdmin={isAdmin}
              />
            )
          )
        }
        
      </div>
    </div>
  );
};

export default Home;
