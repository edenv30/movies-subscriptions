import React from 'react';

import { Link } from 'react-router-dom';
// <Link to='adduser' className="btn btn-outline-warning">Add user</Link>

// Only fron Admin!!!!!!
const ManageUsers = () => {

    return(
        <div>
            <h1>Movies - Subscriptions: Manage Users</h1>
            <Link to='allusers' className="btn btn-outline-warning">All users</Link>
            <Link to='addusername' className="btn btn-outline-warning">Add user</Link>
        </div>
    )
}

export default ManageUsers;