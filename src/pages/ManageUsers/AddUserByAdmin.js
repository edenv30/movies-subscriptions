import React, { useState, useEffect } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { firestore, addNewUser, isUserNameExist,
        getCollectionListSnapshotToMapUsersLogin } from '../../firebase/firebase.utils';

import { getUserLoginList } from '../../redux/user/user.action';

const AddUserByAdmin = () => {

    const [userName, setUserName] = useState('');
    
    const [changed, setChanged] = useState(false);

    const dispatch = useDispatch();

    const usersList = useSelector(state => state.user.usersLoginList);

    useEffect( () => {
        const collectionRef = firestore.collection('usersLogin');
            collectionRef.onSnapshot(async snapshot => {
                    const collection = getCollectionListSnapshotToMapUsersLogin(snapshot);
                    dispatch(getUserLoginList(collection));
                })
    },[]);

      //check if user name from admin already exist
    const isUserNameExist = () => {
        let flag = true
        usersList.forEach( user => {
            if(user.userName === userName)
                flag = false;
        })
        return flag;
    }
    
    const handleChanges = (e) => {
        e.preventDefault();
        if(userName) {
            try {
                const createdAt = new Date();
                const flag = isUserNameExist(userName);
                if (flag)  
                {
                    addNewUser('usersLogin', {userName, createdAt});
                    alert('Details saved successfully');
                    setChanged(true);
                }
                else
                    alert(`The user name ${userName} already exist !`);
                

            } catch(err) {
                console.log(err);
            }
        }
        else{
            alert('You must insert user name');
            setUserName('');
        }
    }   

    return(
        <div>
            <br /><br /><br />
            <h1 className="text-center"> Users </h1>
            <div className="container py-3">
                <div className="row">
                    <div className="mx-auto col-sm-6">
                        <div className="card bg-dark" >
                            <div className="card-header">
                                <h4 className="mb-0">Add new user</h4>
                            </div>
                            <div className="card-body">
                                <form className="form" role="form" autoComplete="off">
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">User Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" onChange={ e => setUserName((e.target.value).toLowerCase())} />
                                            </div>
                                    </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label"></label>
                                            <div className="col-lg-9">
                                                <input type="button" className="btn btn-danger" value="Add user" onClick={ e => handleChanges(e) } />
                                                <Link to='manageusers' className="btn btn-secondary">Cancel</Link>
                                                { changed ? <Redirect to='manageusers' /> : null}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUserByAdmin;