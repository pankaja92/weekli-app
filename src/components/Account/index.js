import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import withAuthorization from '../Session/withAuthorization';
import * as routes from '../../constants/routes';
import Personalize from './Personalize';
import Security from './Security';

const AccountPage = ({ authUser, match }) => (
  <div>
    <h1>Account: {authUser.email}</h1>
    <ul>
      <li>
        <Link to={`${match.url}`}> Personalize </Link>
      </li>
      <li>
        <Link to={`${match.url}${routes.SECURITY}`}> Security </Link>
      </li>
    </ul>
    <br />
    <Switch>
      <Route exact path={`${match.url}`} component={Personalize} />
      <Route path={`${match.url}${routes.SECURITY}`} component={Security} />
    </Switch>
  </div>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

const authCondition = authUser => !!authUser;

AccountPage.propTypes = {
  authUser: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

AccountPage.defaultProps = {
  authUser: PropTypes.shape({}),
};

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);
