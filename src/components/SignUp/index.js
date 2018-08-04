import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import signup from '../../actions/signup';
import emailValidator from '../../utils/emaiValidator';

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 400;
  &:hover {
    color: var(--white);
    font-weight: 600;
    text-decoration: underline;
    text-decoration-color: var(--white);
  }
`;

const SignUpPage = props => (
  <div className="Form-container">
    <h1>SignUp</h1>
    <SignUpForm {...props} />
  </div>
);

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null,
    };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    const { history, singupFunc } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        const userid = authUser.user.uid;
        const user = { username, email, userid };
        return user;
      })
      .then(user => {
        singupFunc(user);
        this.setState({
          username: '',
          email: '',
          passwordOne: '',
          passwordTwo: '',
        });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      emailValidator(email) === false;

    return (
      <form onSubmit={this.onSubmit} className="Form">
        <input
          value={username}
          onChange={event => this.setState({ username: event.target.value })}
          type="text"
          placeholder="Username"
        />
        <input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState({ passwordOne: event.target.value })}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState({ passwordTwo: event.target.value })}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit" className="button">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Not yet Signed Up ? <StyledLink to={routes.SIGN_UP}>Sign Up</StyledLink>
  </p>
);

const mapDispatchToProps = dispatch => bindActionCreators({ singupFunc: signup }, dispatch);

SignUpForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  singupFunc: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(SignUpPage));

export { SignUpForm, SignUpLink };
