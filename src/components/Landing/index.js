import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as routes from '../../constants/routes';
import './Landing.css';

const StyledLink = styled(Link)`
  /* text-decoration: none;
  border: none;
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  font-weight: 100;
  padding: 10px 20px;
  border-radius: 3px; */
  padding: 10px 20px;
  border: 2px solid #494949 !important;
  border-radius: 3px;
  text-decoration: none;
  font-size: 24px;
  display: inline-block;
  &:hover {
    /* color: #404040 !important; */
    /* border-color: #f6b93b !important;
    font-weight: 700 !important;
    letter-spacing: 3px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.3s ease 0s; */
    color: var(--white) !important;
    background: var(--btnGradient);
    border-color: #f6b93b !important;
    transition: all 0.2s ease 0s;
  }
`;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentWillReceiveProps(props) {
    if (props) {
      this.setState({ loggedIn: true });
    }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Fragment>
        <div className="description">
          <div>
            <h2>Bookmarks as Reminders !</h2>
            <h4 className="low-heading">Get your custom Newsletter weekli </h4>
            {!loggedIn && (
              <div className="signin-btn">
                <div align="center">
                  <StyledLink to={routes.SIGN_IN}>Sign in</StyledLink>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="images">asdasd</div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(LandingPage);
