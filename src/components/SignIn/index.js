import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/login';
import * as routes from '../../constants/routes';

const SignInPage = (props) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm {...props} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null, 
    };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        this.setState(() => ({ email : '', password: '', error: null }));
        this.props.login(authUser.user.uid);
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({error});
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState({email: event.target.value})}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState({password: event.target.value})}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch)
}

export default connect(null,mapDispatchToProps)(withRouter(SignInPage));

export {
  SignInForm,
};
