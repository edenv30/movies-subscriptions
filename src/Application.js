import React from "react";
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import SignUp from './components/SignUp/SignUp';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function Application() {
  const user = null;
  return (
        user ?
        <ProfilePage />
      :
        <Route>
          <SignUp path="signUp" />
          <LoginPage path="/signin" />
        </Route>

  );
}
export default Application;