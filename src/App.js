import React, { useEffect } from 'react';
import './App.css';

import { Switch, Route, Redirect  } from 'react-router-dom';

import Error from './components/Error';
import Home from './pages/MainPage/Home';
import Header from './components/header/Header';
import LoginPage from './pages/Login/LoginPage';
import SignUp from './components/SignUp/SignUp';
import SignUpFirstUserName from './components/SignUp/SignUpFirstUserName';
import MainPage from './pages/MainPage/MainPage.jsx';

import ManageUsers from './pages/ManageUsers/ManageUsers.jsx';
import Movies from './pages/Movies/Movies.jsx';
import Subscriptions from './pages/Subscriptions/Subscriptions.jsx';

import AllMovies from './pages/Movies/AllMovies';
import AddMovie from './pages/Movies/AddMovie';
import EditMovie from './pages/Movies/EditMovie';
import AllUserManage from './pages/ManageUsers/AllUserManage';
import AddUserByAdmin from './pages/ManageUsers/AddUserByAdmin';
import EditUser from './pages/ManageUsers/EditUser';
import AllMembers from './pages/Subscriptions/AllMembers';
import EditMember from './pages/Subscriptions/EditMember';
import AddMember from './pages/Subscriptions/AddMember';

import { onAuthStateChangeFirebase } from './firebase/firebase.utils';
// import { addCollectionsAndDocuments } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setUserLoggenIn, setUserLoginEmailPass } from './redux/user/user.action';

// import util from './utils/utils';

// <Route path='/adduser' component={AddUser} />
// <Route exact path='/' component={LoginPage} />

function App({ loggedIn, setUserLoggenIn, setUserLoginEmailPass }) {
  // const [movies, setMovies] = useState([]);
  // const [members, setMembers] = useState([]);
  //  will be to start listening to auth state changes when our application mounts.
  useEffect( () => {
    // for first time insert to db in firebase
    // util.getMovies().then(resp => setMovies(resp));
    // util.getMembers().then(resp => setMembers(resp));

    const unsubscribe = onAuthStateChangeFirebase(setUserLoggenIn, setUserLoginEmailPass);
    return () => {
      unsubscribe();
    };

  }, []);

    // needs to delete - for first time insert to db in firebase
    // useEffect( () => {
    //   addCollectionsAndDocuments('members', members);
    // }, [members]);
  
      // needs to delete - for first time insert to db in firebase
    // useEffect( () => {
    //   addCollectionsAndDocuments('movies', movies);
    // }, [movies]);

  // console.log("This is the process.env", process.env.PUBLIC_URL)
  return (
      <div className="App">
        <Header loggedIn={loggedIn} />
            <Switch>  
              <Route exact path='/' component={Home} />
              <Route path='/signup' component={SignUp} />
              <Route path='/signupusername' component={SignUpFirstUserName} />
              <Route path='/mainpage' component={MainPage} />
              <Route path='/signin' component={LoginPage} />
              <Route path='/manageusers' component={ManageUsers} />
              <Route path='/allusers' component={AllUserManage} />
              <Route path='/addusername' component={AddUserByAdmin} />
              <Route path='/edituser' component={EditUser} />
              <Route path='/movies' component={Movies} />
              <Route path='/allmovies' component={AllMovies} />
              <Route path='/editmovie' component={EditMovie} />
              <Route path='/addmovie' component={AddMovie} />
              <Route path='/subscriptions' component={Subscriptions} />
              <Route path='/allmembers' component={AllMembers} />
              <Route path='/editmember' component={EditMember} />
              <Route path='/addmember' component={AddMember} />
              <Route component={Error} />
            </Switch>
            { loggedIn ? <Redirect from="/" to="/mainpage" /> : <Redirect  to="/" />  }
      </div>
  );
}
// { loggedIn ? <Redirect from="/signin" to="/mainpage" /> : <Redirect  to="signin" />  }
const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
})

const mapDispatchToProps = dispatch => ({
  setUserLoggenIn: flag => dispatch(setUserLoggenIn(flag)),
  setUserLoginEmailPass: user => dispatch(setUserLoginEmailPass(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);