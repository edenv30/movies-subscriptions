import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { firestore, getCollectionMembersSnapshotToMap } from '../../firebase/firebase.utils';

import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/members/members.actions';

import TypesPermissions from '../ManageUsers/permissionsTypes';
import BackButton from '../../components/BackButton';

const Subscriptions = () => {

    const dispatch = useDispatch();
    const currentUserPermissions = useSelector(state => state.user.currentUserPermissions);

    useEffect( () => {    
        const collectionRef = firestore.collection('members');
        collectionRef.onSnapshot(async snapshot => {
            const collection = getCollectionMembersSnapshotToMap(snapshot);
            dispatch(setMembers(collection));
        })
      }, []);

    //   const members = useSelector(state => state.members.members);

    return(
        <div>
            <br/><br/><br/>
            <h1>Movies - Subscriptions: Subscriptions</h1>
            <div>
            {
                (currentUserPermissions[0])?
                (
                    (currentUserPermissions[0][TypesPermissions.vs])?
                    (             
                        <Link to='allmembers' className="btn btn-outline-warning">All Members</Link>
                    )                    
                    : null
                ) 
                : null
            }
            {
                (currentUserPermissions[0])?
                (
                    (currentUserPermissions[0][TypesPermissions.cs])?
                    (             
                        <Link to='addmember' className="btn btn-outline-warning">Add Member</Link>
                    )                    
                    : null
                ) 
                : null
            }
            </div>
            <br /><br /><br />
            <BackButton children='Go back'/>
        </div>
    )
}

export default Subscriptions;