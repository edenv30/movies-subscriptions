import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getUsersList, getPermissionsUsers, setUsersWithPermissions } from '../../redux/user/user.action';

import { firestore, getCollectionListSnapshotToMap,
    getCollectionListusersPermissionsSnapShotToMap,
    onAuthStateChangeFirebase } from '../../firebase/firebase.utils';

import UserCard from './UserCard';

// Only fron Admin!!!!!!
const AllUserManage = () => {

    const [users, setUsers] = useState([]);  // from firebase
    const [usersPermissions, setUsersPermissions] = useState([]);  // from firebase

    const dispatch = useDispatch();

    const usersList = useSelector(state => state.user.users);  // from redux
    // const usersPermissionsList = useSelector(state => state.user.usersPermissions);

    useEffect( () => {    
        // const collectionRef = firestore.collection('users');
        // collectionRef.onSnapshot(async snapshot => {
        //     const collection = getCollectionListSnapshotToMap(snapshot);
        //     dispatch(getUsersList(collection));
        // })

        // const collectionRef1 = firestore.collection('permissions');
        // collectionRef1.onSnapshot(async snapshot => {
        //     const collection =  getCollectionListusersPermissionsSnapShotToMap(snapshot);
        //     dispatch(getPermissionsUsers(collection));
        // })

        const collectionRef = firestore.collection('users');
        collectionRef.onSnapshot(async snapshot => {
            const collection = getCollectionListSnapshotToMap(snapshot);
            // dispatch(getUsersList(collection));
            setUsers(collection);
        })
  

        const collectionRef1 = firestore.collection('permissions');
        collectionRef1.onSnapshot(async snapshot => {
            const collection =  getCollectionListusersPermissionsSnapShotToMap(snapshot);
            // dispatch(getPermissionsUsers(collection));
            setUsersPermissions(collection);
        })
        
      }, []);

      useEffect( () => {
            users.map(user => {
                const userPremission = usersPermissions.filter( userp => user.id === userp.id )
                user['permissions'] = userPremission;
            });
            dispatch(setUsersWithPermissions(users));
      },[usersPermissions])

    return (
        <div>
            <br /><br /><br />
            <h1 className="text-center"> Users List: </h1>
            <div className="card-group justify-content-center">
                {
                    (usersList) ? 
                    ( usersList.map( user => {
                            return( 
                                <div key={user.id}>
                                    <UserCard  user={user} />
                                </div>
                            )
                        } )) : null
                }
            </div>
        </div>
    )
}

export default AllUserManage;