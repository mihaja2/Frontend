import './detail.scss'
import React, {useEffect, useState} from 'react'
import Navbar from "../../components/navbar/Navbar";
import CommentList from "../../components/Comments/CommentList";
import CommentAdd from "../../components/Comments/CommentAdd";
import Card from 'react-bootstrap/Card'
import Posts from '../../components/Posts/Posts';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostsById } from '../../context/postsContext/apiCalls';
import { getComments } from '../../context/commentContext/apiCalls';
import { getProfileById } from '../../context/profileContext/apiCalls';

const Detail = () => {

  const[state, setState]=useState(false);

  const { id } = useParams();
  const [post , setPost] = useState(null);
  const [comments , setComments] = useState([]);

  const[deleteComment, setDeleteComment]=useState(false);
  const[editComment, setEditComment]=useState(false);

  const[deletePost, setDeletePost]=useState(false);
  const[editPost, setEditPost]=useState(false);
  const [isAdmin,setAdmin] = useState(false);

  const history = useNavigate() ;

  useEffect(() => {
    async function fetchDataId() {  
      const resultat = await getPostsById(id);
      if(resultat){
        setPost(resultat);
      }
    }
    async function fetchDataComment(){
      const res = await getComments(id);
      if(res){
        setComments(res);
      }
    }
    setComments([]);
    if(!deletePost){
      fetchData();

      // liste des commentaires
      fetchDataComment();

      // modification
      setEditPost(false);

      // detail d'une publication
      fetchDataId();
      setState(false);

      //verifie si un commentaire a été supprimé
      setDeleteComment(false);

      // verifie si un commentaire a été modifié
      setEditComment(false);

    }else{
      let path = `/`; 
      history(path, { replace: true });
    }


  }, [state,deletePost,editPost,deleteComment,editComment]);

  async function fetchData() {  
    const profil = await getProfileById("me");
    if(profil){
      if(profil.user.role === "admin")
        setAdmin(true);
    }
  }

  return (
    <div className="detail">
        <Navbar />
        <div className="row d-flex justify-content-center detailContenu">
            <div className="col-md-8 col-lg-10">
            {
              post && (
                <Posts  
                  post={post}
                  setDeletePost={setDeletePost}
                  setEditPost={setEditPost}
                  isAdmin={isAdmin}
                />
              )
            }

            </div>
            {
              post && (
              <div className="col-md-8 col-lg-6">
                <Card className="comments shadow-0">
                    <Card.Body className="p-4">
                      { comments && !comments.msg && (
                          comments.map((coms,i) =>
                          <CommentList  
                            coms={coms}
                            key={i}
                            setDeleteComment={setDeleteComment}
                            setEditComment={setEditComment}
                            isAdmin={isAdmin}
                          />
                          )
                      )}
                      <CommentAdd stateChanger={setState} postId={post._id}/>
                    </Card.Body>
                </Card>
              </div>
              )
            }
        </div>
    </div>
  )
}

export default Detail