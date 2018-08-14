import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from '../Navigation';
import LandingPage from '../Landing/Loader';
import SignUpPage from '../SignUp/Loader';
import SignInPage from '../SignIn/Loader';
import PasswordForgetPage from '../PasswordForget/Loader';
import HomePage from '../Home/Loader';
import AccountPage from '../Account/Loader';
import withAuthentication from '../Session/withAuthentication';
import FAQ from '../FAQ/Loader';
import Contact from '../Contact/Loader';
import Extensions from '../Extensions/Loader';
import NotFound from '../NotFound/Loader';
import * as routes from '../../constants/routes';

const Root = () => (
  <div className="app">
    <Navigation />
    <div className="container">
      <Switch>
        <Route exact path={routes.LANDING} component={LandingPage} />
        <Route path={routes.SIGN_UP} component={SignUpPage} />
        <Route path={routes.SIGN_IN} component={SignInPage} />
        <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={routes.HOME} component={HomePage} />
        <Route path={routes.ACCOUNT} component={AccountPage} />
        <Route path={routes.FAQ} component={FAQ} />
        <Route path={routes.CONTACT} component={Contact} />
        <Route path={routes.EXTENSIONS} component={Extensions} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
);

export default withAuthentication(Root);
