import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { login } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';
import { setUserLoginEmailPass } from '../../redux/user/user.action';


const SignIn = ({setUserLoginEmailPass}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        // setUserLoginEmailPass({ email, password });
        login(email, password);
    }

    return(
        <div>
            <h1>Movies - Subscriptions: Sign In </h1>
            <form className="text-center">
                <div className="form-group w-25 p-3 mx-auto">
                    <label htmlFor="inputEmail1">Email address</label>
                    <input type="email" className="form-control" id="inputEmail1" 
                        aria-describedby="emailHelp" placeholder="Enter email"
                        onChange={ e => setEmail(e.target.value) } />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group w-25 p-3 mx-auto">
                    <label htmlFor="inputPassword1">Password</label>
                    <input type="password" className="form-control" id="inputPassword1" 
                        placeholder="Password"
                        onChange={ e => setPassword(e.target.value) } />
                </div>
                
                <button className="btn btn-warning"
                        onClick={ (e) => handleClick(e)} >
                         Sign In</button><br /><br />

                <div>
                    <label className="form-check-label" htmlFor="exampleCheck1">New User?</label>
                    <Link to="signupusername" className="badge badge-warning"> Create Account</Link>
                    <br /><br />
                </div>
            </form>
        </div>
    )
}

// const mapDispatchToProps = dispatch => ({
//     setUserLoggenIn: flag => dispatch(setUserLoggenIn(flag))
// })

const mapStateToProps = state => ({
    loggedIn: state.user.loggedIn
  })

const mapDispatchToProps = dispatch => ({
    setUserLoginEmailPass: user => dispatch(setUserLoginEmailPass(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);