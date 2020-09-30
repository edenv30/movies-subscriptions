import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { firestore,
    getCollectionListSnapshotToMapUsersLogin } from '../../firebase/firebase.utils';
import { getUserLoginList } from '../../redux/user/user.action';

const SignUpFirstUserName = () => {

    const [userName, setUserName] = useState('');
    // first to check if the userName is exist in firebase -> if not show a message, if yes redirect to sign up page
    // with the id created in the fire base when the admin create the user
    // and check in users the id is not already exist !!!
    const usersList = useSelector(state => state.user.usersLoginList);
    const dispatch = useDispatch();

    const [isExist, setIsExist] = useState(false);  // if the user name exist
    const [isSignup, setIsSignup] = useState(false);  // if already sign up 
    const [isSubmit, setIsSubmit] = useState(false);
    const [userId, setUserId] = useState('');
 
    useEffect( () => {
        const collectionRef = firestore.collection('usersLogin');
            collectionRef.onSnapshot(async snapshot => {
                    const collection = getCollectionListSnapshotToMapUsersLogin(snapshot);
                    dispatch(getUserLoginList(collection));
                })
    },[]);

    const isUserNameExist = () => {
        let flag = false;
        let isSign=false;
        let id = '';
        console.log(usersList)
        usersList.forEach( user => {
            if(user.userName === userName){
                flag = true;
                isSign = user.signup;
                id = user.id;
            }
        })
        return {flag, isSign, id};
    }

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmit(true);
        const {flag, isSign, id} = isUserNameExist();
        setIsExist(flag);
        setIsSignup(isSign);
        setUserId(id);
    }

    const clear = () => {
        alert(`${userName} already sign in the system!`) 
        return <Redirect to='signin'></Redirect>
    }

    return (
        <div>
            <h1>Movies - Subscriptions: Sign Up - User Name </h1>
            <h3>Create an account</h3>
            <form>
                <div className="form-group w-25 p-3 mx-auto">
                    <label htmlFor="displayName">User Name from admin</label>
                    <input className="form-control" 
                        onChange={event => setUserName((event.target.value.toLowerCase())) } />
                        <br /><br />
                        <button className="btn btn-warning"
                        onClick={ (e) => handleSubmit(e) }>
                            Submit
                        </button> <br /><br />
                        {   
                            (isSubmit)?(
                            (isExist) ? 
                            ((isSignup)?
                                (
                                clear())
                                :
                                <Redirect to={{
                                pathname: 'signup',
                                state: {userName, userId}
                                }} />
                            )
                            :
                            alert(`User name doesn't exist !`)) : null
                        }
                </div>
            </form>
        </div>
    )
}

export default SignUpFirstUserName;