import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import MemberCard from './MemberCard';

import { firestore, getMoviesByMemberid } from '../../firebase/firebase.utils';

import { setMoviesByMember } from '../../redux/members/members.actions';

const AllMembers = () => {

    const members = useSelector(state => state.members.members);

    const dispatch = useDispatch();


    useEffect( ()=> {
        const collectionRef = firestore.collection('subscriptions');
        collectionRef.onSnapshot(async snapshot => {
            const collection = getMoviesByMemberid(snapshot);
            dispatch(setMoviesByMember(collection));
        })
    }, []);


    return (
        <div>
            <br/><br/><br/>
            <h1 className="text-center"> Members List: </h1>
            <div className="card-group justify-content-center">

            {
                members.map( (member, index) => {
                    return <MemberCard key={index} member={member}/>
                })
            }
            </div>
        </div>
    )
}

export default AllMembers;