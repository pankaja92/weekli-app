import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import './Landing.css';

const LandingPage = () => (
  <Fragment>
    <div className="description">
      <div>
        <h2>Bookmarks as Reminders !</h2>
        <h4 className="low-heading">Get your custom Newsletter weekli </h4>
        <div className="signin-btn">
          <span className="this-span">
            <Link to={routes.SIGN_IN}> Sign in</Link>
          </span>
        </div>
      </div>
    </div>
    <div className="images">asdasd</div>
  </Fragment>
);

export default LandingPage;
