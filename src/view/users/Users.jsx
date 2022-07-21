import './users.scss';

import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Reset from '../../components/reset/Reset';
import { deleteUser, getAllUser } from '../../context/adminContext/apiCalls';
import DataTable from 'react-data-table-component-with-filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { getProfileById } from '../../context/profileContext/apiCalls';


const Users = () => {
  
    const [users, setUsers] = useState(null)
    const [isDelete, setDelete] = useState(false)
    const [isAdmin,setAdmin] = useState(false);



    useEffect(() => {

        //liste des utilisateurs sauf admin
        async function fetchDataAll(){
            const res = await getAllUser();
            setUsers(res);
        }
        
        setDelete(false);
        fetchData();
        fetchDataAll();
    }, [isDelete,users]);


    //initialisation colonne Datatable
    const columns = [
        {
            name: 'ID',
            selector: row => row._id,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            filterable: true
        },
        {
            name: 'Nom',
            selector: row => row.lastname,
            sortable: true,
            filterable: true
        },
        {
            name: 'Prenom',
            selector: row => row.firstname,
            sortable: true,
            filterable: true
        },
        {
            name: 'Phone',
            selector: row => row.phonenumber,
            sortable: true,
            filterable: true
        },
        {
            name: 'Genre',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        
        {
            name:"Action",
            cell: (row) => (
                <>
                {
                    row && (
                        <>
                            {/* Modal Reset password */}
                            <Reset row={row} isAdmin={isAdmin}/>

                            <span onClick={() => handleButtonClick(row._id)} className='btn btn-danger'>
                            <FontAwesomeIcon icon="fa-solid fa-trash"/>    
                            </span>
                        </>
                    )
                }

              

                
                </>
                ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const handleButtonClick = (state) => {
        Swal.fire({
            title: 'Voulez vous supprimer cet utilisateur?',
            icon: 'question',
            showCancelButton:true,
            confirmButtonText: 'Delete',
            }).then((willDelete) => {
            if(willDelete.isConfirmed){
                deleteUser(state);
                setDelete(true);
            }
            });
      };

    

    async function fetchData() {  
        const profil = await getProfileById("me");
        if(profil){
            if(profil.user.role === "admin")
            setAdmin(true);
        }
    }

  return (
    <div className="users">
      <Navbar />
      {
          isAdmin && (
            <>
                <div className=" container userlist py-5">
                    <h2 className="text-secondary mb-5 text-center">Liste des utilisateurs</h2>
                    {
                        (users && !users.msg) ?(
                            <DataTable
                                columns={columns}
                                data={users}
                                pagination
                                fixedHeader
                                fixedHeaderScrollHeight="400px"
                            />

                        ):(
                            <div className="text-center">
                                Aucune donnée
                            </div>
                        )
                    }
                </div>
            </>

          )
      }
    </div>
  )
}

export default Users