import React, { useState } from 'react';

import { Form } from 'react-bootstrap';

import { Link, Redirect } from 'react-router-dom';

import TypesPermissions from './permissionsTypes';

import { addNewUser } from '../../firebase/firebase.utils';

const AddUser = () => {

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    // const [permissions, setPermissions] = useState([]);

    const [changed, setChanged] = useState(false);

    const handleChanges = (e) => {
        e.preventDefault();
        if(displayName && email) {
            const createdAt = new Date();
            addNewUser('users', {displayName, email, createdAt});
            alert('Details saved successfully');
            setChanged(true);

        }
        else{
            alert('You muse insert name & email');
            setDisplayName('');
            setEmail('');
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
                                <form className="form" autoComplete="off">
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" onChange={ e => setDisplayName(e.target.value)} />
                                            </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="email" onChange={ e => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Permissions</label>
                                            <div className="col-lg-9">
                                                    
                                                <Form.Group controlId="formBasicCheckbox">
                                                    <Form.Check type="checkbox" id={TypesPermissions.vs} label={TypesPermissions.vs} 
                                                            />
                                                    <Form.Check type="checkbox" id={TypesPermissions.cs} label={TypesPermissions.cs}  
                                                             />
                                                    <Form.Check type="checkbox" id={TypesPermissions.us} label={TypesPermissions.us} 
                                                            />
                                                    <Form.Check type="checkbox" id={TypesPermissions.ds} label={TypesPermissions.ds} 
                                                           />
                                                    <Form.Check type="checkbox" id={TypesPermissions.vmovies}  label={TypesPermissions.vmovies} 
                                                             />
                                                    <Form.Check type="checkbox" id={TypesPermissions.cm} label={TypesPermissions.cm} 
                                                             />
                                                    <Form.Check type="checkbox" id={TypesPermissions.um} label={TypesPermissions.um}
                                                           />
                                                    <Form.Check type="checkbox" id={TypesPermissions.dm} label={TypesPermissions.dm}  
                                                             />
                                                        
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label"></label>
                                            <div className="col-lg-9">
                                                <input type="button" className="btn btn-danger" value="Add user" onClick={ e => handleChanges(e) } />
                                                <Link to='manageuserss' className="btn btn-secondary">Cancel</Link>
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

export default AddUser;