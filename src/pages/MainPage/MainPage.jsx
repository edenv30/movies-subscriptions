import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap,
        getCollectionListusersPermissionsSnapShotToMap } from '../../firebase/firebase.utils';

import { setMovies } from '../../redux/movies/movies.actions.js'
import { getPermissionsUsers, getCurrentUserPermissions } from '../../redux/user/user.action';

const MainPage = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);  // from redux
    
    const permissionsUsers = useSelector(state => state.user.usersPermissions);  // from redux

    useEffect( () => {    
        
        const collectionRef = firestore.collection('movies');
        collectionRef.onSnapshot(async snapshot => {
            const collection = convertCollectionsSnapshotToMap(snapshot);
            dispatch(setMovies(collection));
        })

        const collectionRef2 = firestore.collection('permissions');
        collectionRef2.onSnapshot(async snapshot => {
            const collection =  getCollectionListusersPermissionsSnapShotToMap(snapshot);
            // dispatch(getPermissionsUsers(collection));
            dispatch(getPermissionsUsers(collection));
        })
        
      }, []);

      useEffect( () => {
        if(permissionsUsers && currentUser){
            const userPremission = permissionsUsers.filter( permission => permission.id === currentUser.id )
            // currentUserPermissions['permissions'] = userPremission 
            dispatch(getCurrentUserPermissions(userPremission))
        }
        
      }, [permissionsUsers, currentUser]);

    return(
        <div>
            <br/><br/><br/>
            <h1>Movies - Subscriptions: Main Page</h1>
            <div>
            { 
                (currentUser) ? ((currentUser.userName !== 'admin')) ?
                ( <div>
                    <Link to='movies' className="btn btn-outline-warning">Movies</Link>
                    <Link to='subscriptions' className="btn btn-outline-warning">Subscriptions</Link>
                    <Link to='signin' className="btn btn-outline-warning">Log Out</Link>
                </div>
                )
                :
               (<div> 
                    <Link to='movies' className="btn btn-outline-warning">Movies</Link>
                    <Link to='subscriptions' className="btn btn-outline-warning">Subscriptions</Link>
                    <Link to='manageusers' className="btn btn-outline-warning">Users Management</Link>
                    <Link to='signin' className="btn btn-outline-warning">Log Out</Link> 
                </div>
                ) : null
            }
            </div>
        </div>
    )
}

export default MainPage;