import React from 'react';

import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';

// <Link to='adduser' className="btn btn-outline-warning">Add user</Link>

// Only fron Admin!!!!!!
const ManageUsers = () => {

    return(
        <div>
            <h1>Movies - Subscriptions: Manage Users</h1>
            <div>
                <Link to='allusers' className="btn btn-outline-warning">All users</Link>
                <Link to='addusername' className="btn btn-outline-warning">Add user</Link>
            </div>
            <br /><br /><br />
            <BackButton children='Go back'/>
        </div>
    )
}

export default ManageUsers;