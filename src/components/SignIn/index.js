/* eslint-disable no-unused-state */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import styled from 'styled-components';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import login from '../../actions/login';
import * as routes from '../../constants/routes';
import emailValidator from '../../utils/emaiValidator';
import './Signin.css';

const InputText = styled(Input)`
  padding: 0 10px;
  font-family: 'PT Sans', sans-serif;
  color: red;
`;

const SignInPage = props => (
  <div className="Form-container">
    <h2>Sign In</h2>
    <SignInForm {...props} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    const { history, loginFunc } = this.props;
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState(() => ({ email: '', password: '', error: null }));
        loginFunc(authUser.user.uid);
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || emailValidator(email) === false;

    return (
      <form onSubmit={this.onSubmit} className="Form">
        <InputText
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email address"
          value={email}
        />
        <InputText
          style={{ margin: '10px 0 20px' }}
          placeholder="Password"
          value={password}
          type="password"
          onChange={event => this.setState({ password: event.target.value })}
        />
        <button disabled={isInvalid} type="submit" className="button">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loginFunc: login }, dispatch);

SignInForm.propTypes = {
  loginFunc: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(SignInPage));

export { SignInForm };
