import React from 'react';
import { compose } from 'recompose';
import { Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withAuthorization from '../Session/withAuthorization';
import * as routes from '../../constants/routes';
import Personalize from './Personalize';
import Security from './Security';
import './Accout.css';

const Div = styled.div`
  width: 30%;
`;

const AccountPage = ({ match }) => (
  <div className="personalize-content">
    {/* <h1>Account: {authUser.email}</h1> */}
    <div>
      <ul>
        <li>
          <Link to={`${match.url}`}> Personalize </Link>
        </li>
        <li>
          <Link to={`${match.url}${routes.SECURITY}`}> Security </Link>
        </li>
      </ul>
    </div>
    <Div>
      <Switch>
        <Route exact path={`${match.url}`} component={Personalize} />
        <Route path={`${match.url}${routes.SECURITY}`} component={Security} />
      </Switch>
    </Div>
  </div>
);

const authCondition = authUser => !!authUser;

AccountPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default compose(withAuthorization(authCondition))(AccountPage);
