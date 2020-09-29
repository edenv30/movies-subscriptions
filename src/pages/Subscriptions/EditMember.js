import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { updateMemberDataInFirebase } from '../../firebase/firebase.utils';

const EditMember = () => {

    const location = useLocation();
    const member = location.state.member;

    const [name, setName] = useState(member.name);
    const [email, setEmail] = useState(member.email);
    const [city, setCity] = useState(member.city);

    const [changed, setChanged] = useState(false);

    const handleChanges = (e) => {
        e.preventDefault();
        updateMemberDataInFirebase(member.id, name, email,city, 'members')
        alert('Details changed successfully');
        setChanged(true);
    }   

    return(
        <div>
            <br/><br/><br/>
            <h2>Members</h2>
            <h4>Edit member: {name}</h4>
            <div className="container py-3">
                    <div className="row">
                        <div className="mx-auto col-sm-6">
                            <div className="card bg-dark" >
                                <div className="card-header">
                                    <h4 className="mb-0">Member Information</h4>
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
                                            <label className="col-lg-3 col-form-label form-control-label">City</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={city} onChange={ e => setCity(e.target.value)} />
                                            </div>
                                         </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label"></label>
                                            <div className="col-lg-9">
                                                <input type="button" className="btn btn-danger" value="Save Changes" onClick={ e => handleChanges(e) } />
                                                <Link to='allmembers' className="btn btn-secondary">Cancel</Link>
                                                { changed ? <Redirect to='allmembers' /> : null}
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

export default EditMember;