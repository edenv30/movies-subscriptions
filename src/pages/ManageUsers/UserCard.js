import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Modal, Button, DropdownButton } from 'react-bootstrap';

import { deleteUserFromFirebase, deleteDataFromFirebase } from '../../firebase/firebase.utils';

//<Link to="signup" classNameName="badge badge-warning"> Delete </Link>

const UserCard = ({user}) => {

    console.log(user);

    const [show, setShow] = useState(false);

    const handleClose = () =>{ 
        setShow(false);
    }
    const handleShow = () => { 
        setShow(true);
    }

    const checkPermissionsTrue = (permissions) => {
        const keys = Object.keys(permissions[0]);
        const filtered = keys.filter( key => permissions[0][key] === true);
        return filtered;
    }

    const deleteUser = (e) => {
        e.preventDefault();
        handleClose();
        deleteDataFromFirebase('users', user.id);
        deleteDataFromFirebase('permissions', user.id);
        deleteDataFromFirebase('usersLogin', user.userId);
        // deleteUserFromFirebase(user.id);
    }

    return (
        <div>
            <br /><br />
            <div className="card text-white bg-dark mb-3" style={{maxWidth: "18rem"}}>
                <div className="card-header">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <span> {user.email} </span>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{user.displayName}</h5>
                    <p className="card-text">
                        Created data:  <br />
                        
                    </p>
                    <DropdownButton
                        style="default"
                        size="small"
                        style={{ maxHeight: "28px" }}
                        title={"Permissions"}
                        key={1}
                        id="dropdown-size-small"
                        variant="secondary"     
                    >
                        <ul className="card-body">
                        Permissions: 
                        
                        {
                            checkPermissionsTrue(user.permissions).map( (p, index) =>{
                                return <li key={index}>{p}</li> })
                        }
                        
                        </ul>
                        </DropdownButton>
                </div>
                <div className="card-footer bg-transparent">
                    <li className="list-inline-item">
                        <Link to={{pathname: '/edituser', state:{ user}}}
                            className="btn btn-danger btn-sm rounded-0" type="button" 
                            data-toggle="tooltip" data-placement="top" title="Edit">
                            <i className="fa fa-pencil" aria-hidden="true"></i>    
                        </Link>
                    </li>     
                      
                    <li className="list-inline-item">
                        <Button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" 
                                data-placement="top" title="Delete"
                                onClick={e => handleShow(e)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                    </li>
                    
                    
                            <Modal show={show} onHide={handleClose} >
                                 <div className="card text-white bg-dark mb-3">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete User</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Are you sure you want to delete the user {user.displayName}?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="danger" onClick={e => deleteUser(e) }>
                                            Yes
                                        </Button>
                                        <Button variant="secondary" onClick={handleClose}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </div>
                            </Modal>
                </div>
            </div>
        </div>
    )
}

export default UserCard;