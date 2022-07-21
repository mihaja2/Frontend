import './profile.scss'
import { useParams } from 'react-router-dom';
import React,{useContext,useEffect, useState} from 'react'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import Navbar from "../../components/navbar/Navbar";
import Posts from '../../components/Posts/Posts';
import { getPostsByme } from '../../context/postsContext/apiCalls';
import { PostsContext } from '../../context/postsContext/PostsContext';

const Profile = () => {
  const { posts, dispatch } = useContext(PostsContext);

  const[deletePost, setDeletePost]=useState(false);
  const[editPost, setEditPost]=useState(false);

  const { id } = useParams();
  useEffect(() => {
    
    //liste des postes publiée par un utilisateur
    getPostsByme(id,dispatch);
    setDeletePost(false);
    setEditPost(false)
  }, [dispatch,deletePost,editPost]);

  return (
    <div className='profile'>
        <Navbar/>
        <div className="profileContenu">
            <ProfileHeader id={id}/>

            <div className="userPosts">
              {posts.map((post,i) =>
                <Posts  
                  post={post}
                  key={i}
                  setDeletePost={setDeletePost}
                  setEditPost={setEditPost}
                />
              )}
            </div>
        </div>
    </div>
  )
}

export default Profile