import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button, Modal, ListGroup  } from 'react-bootstrap';
import { deleteDataFromFirebase } from '../../firebase/firebase.utils.js';

import TypesPermissions from '../ManageUsers/permissionsTypes';

const MovieCard = ({movie}) => {
    
    const currentUserPermissions = useSelector(state => state.user.currentUserPermissions);
    // const currentUser = useSelector(state => state.user.currentUser);

    const [show, setShow] = useState(false);

    const handleClose = () =>{ 
        setShow(false);
    }
    const handleShow = () => { 
        setShow(true);
    }

    const deleteMovie = (e, id) => {
        e.preventDefault();
        deleteDataFromFirebase('movies', id);
        // deleteMovieFromFirebase(id, 'movies');
        handleClose();
    }


    return (

        <div key={movie.id} className="card card-custom mx-2 mb-3" style={{width: "18rem", textAlign: "center", background: "black"}}>
                        <img src={movie.image} className="card-img-top" alt="" />
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">Genres:</p>
                                    <ListGroup as="ul">
                                        {movie.genres.map(
                                            (gener, index) => <ListGroup.Item as="li" variant="danger" key={index}> {gener} </ListGroup.Item>
                                        )} 
                                    </ListGroup><br /><br />
                                    {
                                        (currentUserPermissions[0][TypesPermissions.um])?
                                        (
                                            <Link to={{pathname: '/editmovie', state:{ movie}}}
                                                className="btn btn-danger" type="button" 
                                                data-toggle="tooltip" data-placement="top" title="Edit">
                                                Edit
                                            </Link>
                                        ) : null
                                    }
                                
                                {
                                    (currentUserPermissions[0][TypesPermissions.dm])?
                                    (
                                        <Button className="btn btn-danger" onClick={e => handleShow(e)}>Delete</Button>
                                    ) : null
                                }
                                    <Modal show={show} onHide={handleClose} >
                                    <div className="card text-white bg-dark mb-3">
                                        <Modal.Header closeButton>
                                            <Modal.Title>Delete Movie</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to delete the movie {movie.name}?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="danger" onClick={(e) => deleteMovie(e, movie.id)}>
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
    )
}

export default MovieCard;