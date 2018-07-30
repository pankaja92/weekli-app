import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import './navigation.css';
import Logo from './Logo';

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <div className="navbar">
    <ul>
      <div>
        <Logo />
      </div>
      <div className="notlogo">
        <li>
          <span>
            <NavLink to={routes.HOME} activeClassName="activeLink">
              Home
            </NavLink>
          </span>
        </li>
        <Reusalbe />
        <li>
          <NavLink to={routes.ACCOUNT} activeClassName="activeLink">
            Account
          </NavLink>
        </li>
        <li>
          <SignOutButton />
        </li>
      </div>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div className="navbar">
    <ul>
      <div>
        <li>
          <NavLink to={routes.LANDING} activeClassName="activateLogo">
            <Logo />
          </NavLink>
        </li>
      </div>
      <div className="notlogo">
        <Reusalbe />
        <li>
          <span>
            <NavLink to={routes.SIGN_IN} activeClassName="activeLink">
              Sign In
            </NavLink>
          </span>
        </li>
      </div>
    </ul>
  </div>
);

const Reusalbe = () => (
  <Fragment>
    <li>
      <span>
        <NavLink to={routes.FAQ} activeClassName="activeLink">
          FAQ
        </NavLink>
      </span>
    </li>
    <li>
      <span>
        <NavLink to={routes.EXTENSIONS} activeClassName="activeLink">
          Extension
        </NavLink>
      </span>
    </li>
    <li>
      <span>
        <NavLink to={routes.CONTACT} activeClassName="activeLink">
          Contact
        </NavLink>
      </span>
    </li>
  </Fragment>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

Navigation.propTypes = {
  authUser: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
  }),
};

Navigation.defaultProps = { authUser: PropTypes.shape({}) };

export default withRouter(connect(mapStateToProps)(Navigation));
