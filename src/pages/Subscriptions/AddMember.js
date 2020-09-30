import React, { useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { addNewUser } from '../../firebase/firebase.utils';

const AddMember = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');

    const [changed, setChanged] = useState(false);

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    const handleChanges = (e) => {
        e.preventDefault();
        if(name && email && city) {
            addNewUser('members', {name, email, city});
            alert('Details saved successfully');
            setChanged(true);
        }
        else{
            alert('You muse insert name & email & city');
            setName('');
            setEmail('');
            setCity('');
        }
    }   

    return(
        <div>
            <br/><br/><br/>
            <h1 className="text-center"> Members </h1>
            <div className="container py-3">
                <div className="row">
                    <div className="mx-auto col-sm-6">
                        <div className="card bg-dark" >
                            <div className="card-header">
                                <h4 className="mb-0">Add new member</h4>
                            </div>
                            <div className="card-body">
                                <form className="form" role="form" autoComplete="off">
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" onChange={ e => setName(capitalize(e.target.value))} />
                                            </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="email" onChange={ e => setEmail(capitalize(e.target.value))} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">City</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" onChange={ e => setCity(capitalize(e.target.value))} />
                                        </div>
                                    </div>
                                       
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label"></label>
                                            <div className="col-lg-9">
                                                <input type="button" className="btn btn-danger" value="Add member" onClick={ e => handleChanges(e) } />
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

export default AddMember;