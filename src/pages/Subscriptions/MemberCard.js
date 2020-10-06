import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Card, Nav, Button, Modal, Form, Dropdown } from 'react-bootstrap';

import { updateDataInFirebase, checkMemberInFirebase, deleteDataFromFirebase } from '../../firebase/firebase.utils';

import TypesPermissions from '../ManageUsers/permissionsTypes';


const MemberCard = ({member}) => {
    
    const currentUserPermissions = useSelector(state => state.user.currentUserPermissions);

    const moviesList = useSelector(state => state.movies.movies);
    const moviesOfmembers = useSelector(state => state.members.moviesByMember);
    
    const [moviesByMemberId, setmoviesByMemberId] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const [show, setShow] = useState(false);
    const [activeKey, setActiveKey] = useState('details');
    const [isSubNewMovie, setIsSubNewMovie] = useState(false);

    const [movieId, setMovieId] = useState('');
    const [date,setDate] = useState('');
    const [movieName, setMovieName] = useState('');
    
    const handleClose = () => { 
        setShow(false);
    }

    const handleShow = () => { 
        setShow(true);
    }

    const deleteUser = (e) => {
        e.preventDefault();
        handleClose();
        // deleteMemberFromFirebase(member.id, 'members');
        // deleteMemberFromFirebase(member.id, 'subscriptions');

        deleteDataFromFirebase('members', member.id);
        deleteDataFromFirebase('subscriptions', member.id);
    }

    const handleSubNewMovie = e => {
        e.preventDefault();
        setIsSubNewMovie(!isSubNewMovie);
        if(moviesList && moviesByMemberId)
            filteredMoviesExist();
    }

    const handleMovieSubScripbe = (e, id, name) => {
        e.preventDefault();
        setMovieId(id);
        setMovieName(name);
    }

    const handleSubscribe = e => {
        e.preventDefault();
        if(movieId && date) {
            // const obj = { movieId, date };
            // console.log(obj)
            // const movies = [...moviesByMemberId , obj];
            // setmoviesByMemberId([...moviesByMemberId , obj]);  /// to check assingment!!!
            const memberId = member.id;
            checkMemberInFirebase('subscriptions', memberId, {movies: moviesByMemberId} );
            // checkMemberInFirebase('subscriptions', memberId, obj );
            alert(`${member.name} member is subscribed to ${movieName} movie`);
            
        }
        else {
            alert('You must choose movie & date');
            setMovieId('');
            setDate('');
        }
    }

    const updateSubscriptionsMovies = async (movies) => {
        // if(movies.length > 0) {
            await updateDataInFirebase('subscriptions', member.id, {movies} );
        // }
        // if(movies.length === 0) {
        //     await deleteDataFromFirebase('subscriptions', member.id);
        // }
    }

    // const checkIfListChanged = (newMoviesMember) => {
    //     var flag = false;
    //     moviesByMemberId.map( oldMovie => newMoviesMember.map(
    //         newMovie => {
    //             if(oldMovie.movieId !== newMovie.movieId)
    //                 return flag = true;
    //         }
    //     ) )
    //     return flag;
    // }

    useEffect( () => {
        // var flag = false;
        // moviesOfmembers.map( m => {
        //     if(m.id === member.id)
        //         flag = true;

        // })
        if(moviesOfmembers.length > 0) {
            const memberMovies = moviesOfmembers.filter( m => m.id === member.id);
            if(memberMovies.length > 0)
                setmoviesByMemberId(memberMovies[0].movies);
        }
    }, [moviesOfmembers]);

    useEffect( () => {
        if(movieId && date) {
            const obj = { movieId, date };
            // const movies = [...moviesByMemberId , obj];
            setmoviesByMemberId([...moviesByMemberId , obj]);  /// to check assingment!!!
        }
    }, [movieId, date]);

    useEffect( () => {
        if(moviesByMemberId.length > 0) {
            const filtered  = moviesByMemberId.filter(function(array_el){
                return moviesList.filter(function(anotherOne_el){
                    return anotherOne_el.id === array_el.movieId;
                }).length > 0
            });
            // const flag = checkIfListChanged(filtered);
            // console.log(member.name, filtered)
            // if(flag){
                updateSubscriptionsMovies(filtered);
            // }            
        }
    }, [moviesList, moviesByMemberId] );
   
    const filteredMoviesExist = () => {
        const filtered  = moviesList.filter(function(array_el){
            return moviesByMemberId.filter(function(anotherOne_el){
                return anotherOne_el.movieId === array_el.id;
            }).length === 0
        });
        setFilteredList(filtered);
    }
       
    return(
        <div>
            <Card bg='dark'>
                <Card.Header bg='secondary'>
                    <Nav variant="tabs" defaultActiveKey="details"
                        activeKey={activeKey} as="ul" 
                        onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                        <Nav.Item as="li"> 
                            <Nav.Link eventKey="details" className="nav nav-tabs btn btn-danger" 
                            >
                                Member Details
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link eventKey="watched" className="nav nav-tabs btn btn-danger" 
                            >
                                Movies watched
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                {
                    (activeKey === 'details') ? 
                    <div>
                        <Card.Body>
                            <Card.Title>{member.name}</Card.Title>
                            <Card.Text>
                                Email: {member.email}<br />
                                City: {member.city}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        {
                            (currentUserPermissions[0][TypesPermissions.us])?
                            (
                                <li className="list-inline-item">
                                    <Link to={{pathname: '/editmember', state:{ member}}}
                                        className="btn btn-danger btn-sm rounded-0" type="button" 
                                        data-toggle="tooltip" data-placement="top" title="Edit">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>    
                                    </Link>
                                </li>     
                            ) : null
                        }
                        {
                            (currentUserPermissions[0][TypesPermissions.ds])?
                            (
                                <li className="list-inline-item">
                                    <Button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" 
                                            data-placement="top" title="Delete"
                                            onClick={e => handleShow(e)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </Button>
                                </li>
                            ) : null
                        }
                            <Modal show={show} onHide={handleClose} >
                                        <div className="card text-white bg-dark mb-3">
                                            <Modal.Header closeButton>
                                                <Modal.Title>Delete Member</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Are you sure you want to delete the member {member.name}?
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
                        </Card.Footer>
                    </div> : 
                    <div>
                        <Card.Body>
                            <Card.Title>Movies watched</Card.Title>
                            <Card.Text as="ul">
                                    
                                    {
                                        (moviesByMemberId) ?
                                        moviesByMemberId.map( (m, index) => {
                                               var name = '';
                                                moviesList.filter( movie => {
                                                if(movie.id === m.movieId){
                                                    name = movie.name;
                                                }
                                                    return name;
                                                } ) 
                                            
                                            return <li key={index}>
                                                    Movie : {name} <br />
                                                    Date: {m.date}
                                                </li>
                                        } )
                                        : null
                                    }
                                    
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        {
                            (currentUserPermissions[0][TypesPermissions.us])?
                            (
                                <Button className="btn btn-danger" onClick={ e => {handleSubNewMovie(e)}}>Subscribe to new movie </Button>
                            ): null
                        }
                            {
                                (isSubNewMovie) ? 
                                <div>
                                    <br />
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            {(!movieName) ? 'Movies List' : `${movieName}` }
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                        {
                                            (filteredList.length > 0) ? 
                                                (
                                                    filteredList.map( (m, index) => {
                                                        return <Dropdown.Item key={index}
                                                                variant="warning"
                                                                className="btn btn-secondary"
                                                                onClick={e => handleMovieSubScripbe(e, m.id, m.name)}>
                                                                {m.name}
                                                                </Dropdown.Item>
                                                    }) 
                                                
                                                )
                                            : 
                                                (
                                                    moviesList.map( (m, index) => {
                                                        return <Dropdown.Item key={index}
                                                                variant="warning"
                                                                className="btn btn-secondary"
                                                                onClick={e => handleMovieSubScripbe(e, m.id, m.name)}>
                                                                {m.name}
                                                                </Dropdown.Item>
                                                    }) 
                                                
                                            ) 
                                        }
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Form.Group controlId="dw">
                                        <Form.Label>Select Date watched:</Form.Label>
                                        <Form.Control className="btn btn-secondary" type="date" name="dw" 
                                            placeholder="Date watched" 
                                            onChange={e => setDate(e.target.value)} />
                                    </Form.Group>
                                    <Button className="btn btn-danger" onClick={handleSubscribe}>Subscribe</Button>
                                </div> : null
                            }
                        </Card.Footer>
                    </div>
                }
               
            </Card>
        </div>
    )
}

export default MemberCard;