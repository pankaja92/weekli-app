import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import FAQ from '../FAQ';
import Contact from '../Contact';
import Extensions from '../Extensions';
import NotFound from '../NotFound';
import * as routes from '../../constants/routes';

const App = () =>
  <Router>
    <div className="app">
      <Navigation />
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
  </Router>

export default withAuthentication(App);