import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link, Route, Switch } from 'react-router-dom';
import withAuthorization from '../Session/withAuthorization';
import * as routes from '../../constants/routes';
import Personalize from './Personalize';
import Security from './Security';

const AccountPage = ({ authUser, match }) =>{
  return (
    <div>
    <h1>Account: {authUser.email}</h1>
    <ul>
      <li><Link to={`${match.url}`}> Personalize </Link></li>
      <li><Link to={`${match.url}${routes.SECURITY}`}> Security </Link></li>
    </ul>
    <br />
    <Switch>
      <Route exact path={`${match.url}`} component={Personalize} />
      <Route path={`${match.url}${routes.SECURITY}`} component={Security} />
    </Switch>
  </div>
  )
}
  

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);