import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../redux/movies/movies.actions.js'

import AllMovies from './AllMovies';

import TypesPermissions from '../ManageUsers/permissionsTypes';

const Movies = () => {

    const [searchField, setSearchField] = useState('');
    // const dispatch = useDispatch();
    // useEffect( () => {    
    //     // const unsubscribe  = null;
    //     // const unsubscribe = onAuthStateChangeFirebase(, );
    //     const collectionRef = firestore.collection('movies');
    //     collectionRef.onSnapshot(async snapshot => {
    //         const collection = convertCollectionsSnapshotToMap(snapshot);
    //         dispatch(setMovies(collection));
    //     })
    //     // return () => {
    //     //   unsubscribe();
    //     // };
    
    //   }, []);

    const moviesList = useSelector(state => state.movies.movies);
    const currentUserPermissions = useSelector(state => state.user.currentUserPermissions);

    return(
        <div>
            <h1>Movies - Subscriptions: Movies</h1>
            <Link to='allmovies' className="btn btn-outline-warning">All movies</Link>
            {
                (currentUserPermissions[0][TypesPermissions.cm])?
                <Link to='addmovie' className="btn btn-outline-warning">Add movie</Link>
                : null

            }
            <br /><br />
            {
                moviesList ?
                    (
                        <div>
                            Find movie: <input type='search' placeholder='Search Movie'
                                         onChange={e => setSearchField(e.target.value)} /><br /><br />
                            <AllMovies searchField={searchField} />
                        </div>
                    )
                    :
                    null
            }
            <div></div> 
        </div>
    )
}

export default Movies;