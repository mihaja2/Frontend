import "./comments.scss";
import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { getProfileById } from "../../context/profileContext/apiCalls";
import imagesUrl from "../../apiconfig/imagesUrl";
import { createComment } from "../../context/commentContext/apiCalls";
import { CommentContext } from "../../context/commentContext/CommentsContext";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// System d'ajout de commentaire (si on veut utiliser le systeme de component) ;

const CommentAdd = ({stateChanger,postId}) => {

    const {dispatch } = useContext(CommentContext);
    
    const inputRef = useRef(null);
    const [message, setComment] = useState(null);

    const [avatar,setAvatar] = useState(null);

    async function fetchData() {  
        const profil = await getProfileById('me');
        if(profil){
            setAvatar(imagesUrl+ profil.picture);
        }
    }

    const handleSubmit = (e) => {
        async function submitData() {  
          const postcoms = {"message" : message};
          await createComment(postId,postcoms, dispatch);
          resetCommentInput();
          stateChanger(true);
          //resetFileInput();
        }
        e.preventDefault();
        submitData();
      };
    
    useEffect(() => {
        fetchData();
    }, [dispatch]);
    
    const resetCommentInput = () => {
        inputRef.current.value = null;
        setComment(null);
      };

    /*
    const [picture, setImage] = useState(null);
    const resetFileInput = () => {
        inputRef.current.value = null;
        setImage(null);
      };
    */

  return (
    <div className="container my-5 text-dark add-comment">
        <div className="row d-flex justify-content-center">
            <Card className="mb-4 p-2">
                <Card.Body>
                    <div className="d-flex flex-start w-100">
                        <img className="rounded-circle shadow-1-strong me-3"
                        src={avatar} alt="avatar" width="65"
                        height="65" />
                        <div className="w-100">
                            <Card.Text>
                                Add a comment
                            </Card.Text>
                            <div className="form-outline">
                                <textarea className="form-control" 
                                id="message" 
                                name="message"
                                rows="2"
                                onChange={(e) => setComment(e.target.value)}
                                ref={inputRef}
                                ></textarea>
                            </div>

                            {/*
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
                                    onChange={(e) => setImage(e.target.files[0])}
                                    autoFocus
                                    />

                                    {picture && (
                                        <FontAwesomeIcon icon="fa-solid fa-circle-xmark" onClick={resetFileInput} className='text-danger'/>
                                    )} 
                                </li>
                                </ul>

                            </div>
                            */}
                            <div className="d-flex justify-content-between mt-3">
                                <button type="button" className="btn btn-danger mr-0" onClick={handleSubmit}>
                                    Send 
                                </button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    </div>
  )
}

export default CommentAdd