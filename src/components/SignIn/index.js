/* eslint-disable no-unused-state */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import login from '../../actions/login';
import * as routes from '../../constants/routes';
import emailValidator from '../../utils/emaiValidator';
import './Signin.css';

const styles = {
  input: {
    fontFamily: "'PT Sans', sans-serif",
    fontSize: '18px',
    color: 'var(--white)',
    margin: '10px 0 20px',
  },
};

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
    const { classes } = this.props;
    const isInvalid = password === '' || emailValidator(email) === false;

    return (
      <form onSubmit={this.onSubmit} className="Form">
        <TextField
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email address"
          value={email}
          InputProps={{
            className: classes.input,
          }}
        />
        <TextField
          placeholder="Password"
          value={password}
          type="password"
          onChange={event => this.setState({ password: event.target.value })}
          InputProps={{
            className: classes.input,
          }}
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
  classes: PropTypes.shape({}).isRequired,
  loginFunc: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(withRouter(SignInPage))
);

export { SignInForm };
