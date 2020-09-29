import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { setMovies } from '../../redux/movies/movies.actions.js'


const MainPage = () => {
    const dispatch = useDispatch();

    useEffect( () => {    
        
        const collectionRef = firestore.collection('movies');
        collectionRef.onSnapshot(async snapshot => {
            const collection = convertCollectionsSnapshotToMap(snapshot);
            dispatch(setMovies(collection));
        })
    
      }, []);

    return(
        <div>
            <br/><br/><br/>
            <h1>Movies - Subscriptions: Main Page</h1>
            <div>
                <Link to='movies' className="btn btn-outline-warning">Movies</Link>
                <Link to='subscriptions' className="btn btn-outline-warning">Subscriptions</Link>
                <Link to='manageusers' className="btn btn-outline-warning">Users Management</Link>
                <Link to='signin' className="btn btn-outline-warning">Log Out</Link>
            </div>
        </div>
    )
}

export default MainPage;