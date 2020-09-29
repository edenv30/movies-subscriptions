import React , { useState, useEffect } from 'react';

import { signup } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';
import { setUserLoginEmailPass } from '../../redux/user/user.action';

// const [firstName, setFirstName] = useState('');
// const [lastName, setLastName] = useState('');
//     <div className="form-group w-25 p-3 mx-auto">
//     <label htmlFor="firstName">First Name:</label>
//     <input className="form-control" id="firstName"
//         onChange={ e => setFirstName(e.target.value) } />
// </div>
// <div className="form-group w-25 p-3 mx-auto">
//     <label htmlFor="lastName">Last Name:</label>
//     <input className="form-control" id="lastName"
//         onChange={ e => setEmail(e.target.value) } />
// </div>

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
          setEmail(value);
        } else if (name === "userPassword") {
          setPassword(value);
        } else if (name === "userconfirmPassword") {
          setConfirmPassword(value);
        } else if (name === "displayName") {
          setDisplayName(value);
        }
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert(`password don't match!`);
        return;
      }

      try {
        const flag = await signup(displayName, email, password);
        setIsSubmitted(flag);
       
        // createUserProfileDocument()
      } catch (error) {
        console.error(error);
      }
      // setUserLoginEmailPass({ email, password });
      // login(email, password);
    }

    useEffect( () => {
      if(isSubmitted) {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDisplayName('');
        setIsSubmitted(false);
      }

    }, [isSubmitted])

    return(
        <div>
            <h1>Movies - Subscriptions: Sign Up </h1>
            <h3>Create an account</h3>
            <form>
                <div className="form-group w-25 p-3 mx-auto">
                    <label htmlFor="displayName">Display Name:</label>
                    <input className="form-control" 
                        id="displayName"
                        name="displayName"
                        onChange={event => onChangeHandler(event) } />
                </div>
                <div className="form-group w-25 p-3 mx-auto">
                    <label htmlFor="userEmail">Email:</label>
                    <input className="form-control" 
                            id="userEmail" 
                            name="userEmail"
                            aria-describedby="emailHelp"
                            onChange={event => onChangeHandler(event) } />
                </div>
                <div className="form-group w-25 p-3 mx-auto">
                    <label htmlFor="userPassword">Password</label>
                    <input type="password" className="form-control" 
                            id="userPassword"
                            name="userPassword"
                            onChange={event => onChangeHandler(event) } />
                </div>
                <div className="form-group w-25 p-3 mx-auto">
                  <label htmlFor="userPassword">Confirm Password</label>
                  <input type="password" className="form-control" 
                          id="userconfirmPassword"
                          name="userconfirmPassword"
                          onChange={event => onChangeHandler(event) } />
                </div>
                <button className="btn btn-warning"
                    onClick={ (e) => handleSubmit(e) }>
                        Sign up
                    </button> <br /><br />

            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
  setUserLoginEmailPass: user => dispatch(setUserLoginEmailPass(user))
})

export default connect(null, mapDispatchToProps)(SignUp);