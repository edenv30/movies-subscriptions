import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Button, Modal } from 'react-bootstrap';

import { deleteMovieFromFirebase } from '../../firebase/firebase.utils.js';

import TypesPermissions from '../ManageUsers/permissionsTypes';

const AllMovies = ({searchField}) => {

    const currentUserPermissions = useSelector(state => state.user.currentUserPermissions);

    const moviesList = useSelector(state => state.movies.movies);
    const currentUser = useSelector(state => state.user.currentUser);
    console.log(currentUser)

    const [moviesListTemp, setmoviesListTemp] = useState(moviesList);
    
    const [show, setShow] = useState(false);

    const handleClose = () =>{ 
        setShow(false);
    }
    const handleShow = () => { 
        setShow(true);
    }

    useEffect( ()=> {
        try {
            if(searchField) {
                const filteredMovies = moviesList.filter( (movie) => 
                movie.name.toLowerCase().includes(searchField.toLowerCase()) 
                );
                setmoviesListTemp(filteredMovies);
            }
           
        }catch(err) {
            console.log(err);
        }
       
    }, [searchField]);

    const deleteMovie = (e, id) => {
        e.preventDefault();
        deleteMovieFromFirebase(id, 'movies');
        handleClose();
    }

    return (
        <div>
            <div className="container row mt-5 justify-content-center">
                {moviesListTemp.map( movie => {
                    return (
                        <div key={movie.id} className="card card-custom mx-2 mb-3" style={{width: "18rem", textAlign: "center", background: "black"}}>
                        <img src={movie.image} className="card-img-top" alt="" />
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">genres:</p>
                                    <ul style={{listStyleType: "none"}}>
                                    {movie.genres.map(
                                        (gener, index) => <li key={index}> {gener} </li>
                                    )} 
                                    </ul>
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
                } )}
            </div>
        </div>
    )
}

export default AllMovies;