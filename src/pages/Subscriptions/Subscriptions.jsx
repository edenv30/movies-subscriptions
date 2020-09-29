import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { firestore, getCollectionMembersSnapshotToMap } from '../../firebase/firebase.utils';

import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/members/members.actions';

const Subscriptions = () => {

    const dispatch = useDispatch();
    
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
            <Link to='allmembers' className="btn btn-outline-warning">All Members</Link>
            <Link to='addmember' className="btn btn-outline-warning">Add Member</Link>
        </div>
    )
}

export default Subscriptions;