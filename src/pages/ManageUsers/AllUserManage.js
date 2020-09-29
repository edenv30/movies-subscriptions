import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getUsersList, getPermissionsUsers, SetUsersWithPermissions } from '../../redux/user/user.action';

import { firestore, getCollectionListSnapshotToMap,
    getCollectionListusersPermissionsSnapShotToMap,
    onAuthStateChangeFirebase } from '../../firebase/firebase.utils';

import UserCard from './UserCard';

// Only fron Admin!!!!!!
const AllUserManage = () => {

    const [users, setUsers] = useState([]);
    const [usersPermissions, setUsersPermissions] = useState([]);

    const dispatch = useDispatch();

    const usersList = useSelector(state => state.user.users);
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
            setUsers(collection);
        })
  

        const collectionRef1 = firestore.collection('permissions');
        collectionRef1.onSnapshot(async snapshot => {
            const collection =  getCollectionListusersPermissionsSnapShotToMap(snapshot);
            setUsersPermissions(collection);
        })
        
      }, []);

      useEffect( () => {
            users.map(user => {
                const userPremission = usersPermissions.filter( userp => user.id === userp.id )
                user['permissions'] = userPremission;
            });
            dispatch(SetUsersWithPermissions(users));
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