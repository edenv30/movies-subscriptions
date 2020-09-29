import React, { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';

import { Link, Redirect } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

import TypesPermissions from './permissionsTypes';

import { updateUserDateInFireBase, updateUserPermissionsDateInFireBase } from '../../firebase/firebase.utils';

const EditUser = () => {

    const location = useLocation();
    const user = location.state.user

    const [name, setName] = useState(user.displayName);
    const [email, setEmail] = useState(user.email);
    const [permissions, setPermissions] = useState(user.permissions);
    
    const [viewS, setViewS] = useState(permissions[0][TypesPermissions.vs]);
    const [createS, setCreateS] = useState(permissions[0][TypesPermissions.cs]);
    const [updateS, setUpdateS] = useState(permissions[0][TypesPermissions.us]);
    const [deleteS, setDeleteS] = useState(permissions[0][TypesPermissions.ds]);
    const [viewM,setViewM] = useState(permissions[0][TypesPermissions.vmovies]);
    const [createM, setCreateM] = useState(permissions[0][TypesPermissions.cm]);
    const [updateM, setUpdateM] = useState(permissions[0][TypesPermissions.um]);
    const [deleteM, setDeleteM] = useState(permissions[0][TypesPermissions.dm]);


    const [changed, setChanged] = useState(false);

    const permissionschange = (func, e, typeP, flag) => {
        func(e.target.checked);
        permissions[0][typeP] = e.target.checked;
        setPermissions(permissions);
    }

    const handlePermissions = e => {
        if(e.target.id === TypesPermissions.vs) {
            permissionschange(setViewS, e, TypesPermissions.vs, viewS);
            // setViewS(e.target.checked);
            // permissions[0][TypesPermissions.vs] = viewS;
            // setPermissions(permissions);
        }
        else if (e.target.id === TypesPermissions.cs)
            permissionschange(setCreateS, e, TypesPermissions.cs, createS);
        else if (e.target.id === TypesPermissions.us)
            permissionschange(setUpdateS, e, TypesPermissions.us, updateS);
        else if (e.target.id === TypesPermissions.ds)
            permissionschange(setDeleteS, e, TypesPermissions.ds, deleteS);
        else if (e.target.id === TypesPermissions.vmovies)
            permissionschange(setViewM, e, TypesPermissions.vmovies, viewM);
        else if (e.target.id === TypesPermissions.cm)
            permissionschange(setCreateM, e, TypesPermissions.cm, createM);
        else if (e.target.id === TypesPermissions.um)
            permissionschange(setUpdateM, e, TypesPermissions.um, updateM);
        else if (e.target.id === TypesPermissions.dm)
            permissionschange(setDeleteM, e, TypesPermissions.dm, deleteM);
    }

    const handleChanges = (e) => {
        e.preventDefault();
        updateUserDateInFireBase(user.id, name, email, user.createdAt);
        updateUserPermissionsDateInFireBase(user.id, permissions[0]);
        alert('Details changed successfully');
        setChanged(true);
    }   

    return(
        <div>
           <h2>Users</h2>
           <h4>Edit user: {name}</h4>
                <div className="container py-3">
                    <div className="row">
                        <div className="mx-auto col-sm-6">
                            <div className="card bg-dark" >
                                <div className="card-header">
                                    <h4 className="mb-0">User Information</h4>
                                </div>
                                <div className="card-body">
                                    <form className="form" role="form" autoComplete="off">
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={name} onChange={ e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="email" value={email} onChange={ e => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Permissions</label>
                                            <div className="col-lg-9">
                                                
                                                <Form.Group controlId="formBasicCheckbox">
                                                    <Form.Check type="checkbox" id={TypesPermissions.vs} label={TypesPermissions.vs} checked={viewS} 
                                                        onChange={(e) => handlePermissions(e)} />
                                                    <Form.Check type="checkbox" id={TypesPermissions.cs} label={TypesPermissions.cs} checked={createS} 
                                                        onChange={(e) => handlePermissions(e)} />
                                                    <Form.Check type="checkbox" id={TypesPermissions.us} label={TypesPermissions.us} checked={updateS} 
                                                        onChange={(e) => handlePermissions(e)} />
                                                    <Form.Check type="checkbox" id={TypesPermissions.ds} label={TypesPermissions.ds} checked={deleteS} 
                                                        onChange={(e) => handlePermissions(e)} />
                                                    <Form.Check type="checkbox" id={TypesPermissions.vmovies}  label={TypesPermissions.vmovies} checked={viewM} 
                                                        onChange={(e) => handlePermissions(e)} />
                                                    <Form.Check type="checkbox" id={TypesPermissions.cm} label={TypesPermissions.cm} checked={createM} 
                                                        onChange={(e) => handlePermissions(e)} />
                                                    <Form.Check type="checkbox" id={TypesPermissions.um} label={TypesPermissions.um} checked={updateM} 
                                                        onChange={(e) => handlePermissions(e)} />
                                                    <Form.Check type="checkbox" id={TypesPermissions.dm} label={TypesPermissions.dm} checked={deleteM} 
                                                        onChange={(e) => handlePermissions(e)} />
                                                    
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label"></label>
                                            <div className="col-lg-9">
                                                <input type="button" className="btn btn-danger" value="Save Changes" onClick={ e => handleChanges(e) } />
                                                <Link to='allusers' className="btn btn-secondary">Cancel</Link>
                                                { changed ? <Redirect to='allusers' /> : null}
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

export default EditUser;


    // useEffect( () => {
    //     setExtractPermissions(getListPermission(permissions));
    // },[]);

    // const getListPermission = (permissions) => {
    //     delete permissions[0]['id']
    //     console.log(permissions);

    //     // const keys = Object.keys(permissions[0]);
    //     // const filterId = keys.filter( key => {
    //     //     if(key !== 'id')
    //     //         return key
    //     // });
    //     // console.log(filterId)
    //     // const maps = filterId.map( p => permissions[0][p])
    //     // console.log(maps)
    //     // return maps;
    // }

    // permissions.map ( p => {
    //     return <Form.Check type="checkbox" label={p} checked={permissions[0][p]} onChange={(e) => handlePermissions(e, p)} />
    // }
    // )

  