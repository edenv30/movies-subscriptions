import React from 'react';

import { Link } from 'react-router-dom';
// Only fron Admin!!!!!!
const ManageUsers = () => {

    return(
        <div>
            <h1>Movies - Subscriptions: Manage Users</h1>
            <Link to='allusers' className="btn btn-outline-warning">All users</Link>
            <Link to='adduser' className="btn btn-outline-warning">Add user</Link>
            <Link to='addusername' className="btn btn-outline-warning">Add user By User Name</Link>
        </div>
    )
}

export default ManageUsers;