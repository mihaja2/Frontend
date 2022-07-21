import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createUserAdmin } from '../context/adminContext/apiCalls';

const Admin = () => {
    const history = useNavigate();
    useEffect(() => {
        Swal.fire({
            title: 'Voulez vous créer un administrateur ?',
            icon: 'question',
            showCancelButton:true,
            confirmButtonText: 'Delete',
            }).then((willDelete) => {
            let path = `/login`; 
            if(willDelete.isConfirmed){
                createUserAdmin();
            }
            history(path, { replace: true });
            });
      }, []);

  return (
    <div></div>
  )
}

export default Admin