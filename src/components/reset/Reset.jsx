import React, { useRef, useState } from 'react'

import { Button, Form, Modal } from 'react-bootstrap';
import { resetPasswordByAdmin } from '../../context/adminContext/apiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Reset = ({row,isAdmin}) => {

    const inputPassRef = useRef(null);
    const inputConfPassRef = useRef(null);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [newPassword, setNewPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const [formErrors, setFormErrors] = useState({});

    const handleFinish = (state) => {
        async function fetchPasswordData() {
            resetPasswordByAdmin(state,{"newPassword":newPassword})
            resetInput();
            setFormErrors({});
          }

        let erreurs = validate(newPassword,confPassword);
        if(Object.keys(erreurs).length === 0)
            fetchPasswordData();
        else
            setFormErrors(erreurs);
      };

    const resetInput = () => {
        inputPassRef.current.value = null;
        inputConfPassRef.current.value = null;
        setConfPassword(null);
        setNewPassword(null);
    };

    const validate = (pass,confPass) => {
        const errors = {};
    
        const mdpregex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&*])(?=.*[a-zA-Z]).{8,}$/gm;
    
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


  return (
    <div className="resetPassword">
        {
            isAdmin && (
                <>
                    <span onClick={handleShow} className='btn btn-success'>
                    <FontAwesomeIcon icon="fa-solid fa-key" /> 
                    </span>
                    
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h5 className='text-muted'>
                                Réinitialiser le mot de passe de {row.email}
                                </h5>
                            </Modal.Title>
                            
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                            
                            <Form.Group className="mb-2 text-right" controlId="newPassword">
                                <Form.Control
                                type="password"
                                name="newPassword"
                                onChange={(e) => setNewPassword(e.target.value)}
                                ref={inputPassRef}
                                placeholder="Mot de Passe"
                                required
                                autoFocus
                                />
                                {
                                    formErrors.password && (
                                        <p className="small">{formErrors.password}</p>
                                    )
                                }
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="confPassword">
                                <Form.Control
                                type="password" 
                                name="confPassword"
                                onChange={(e) => setConfPassword(e.target.value)}
                                ref={inputConfPassRef}
                                placeholder="Confirmer le Mot de Passe"
                                autoFocus
                                />
                                {
                                    formErrors.confirmation && (
                                        <p className="small">{formErrors.confirmation}</p>
                                    )
                                }
                            </Form.Group>
                            
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                            Close
                            </Button>
                            <Button variant="primary" onClick={() => handleFinish(row._id)}>
                            Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )
        }
        
    </div>
  )
}

export default Reset