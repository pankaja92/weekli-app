import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signup } from './../../actions/signup';

const SignUpPage = (props) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm {...props} />
  </div>

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null, 
      user:{} 
    };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        const userid = authUser.user.uid;
        const user = { username, email, userid };
        this.setState({user});
      })
      .then(() => {
        this.props.signup(this.state.user);
        this.setState({
          username: '',
          email: '',
          passwordOne: '',
          passwordTwo: '',
        })
        history.push(routes.HOME);
      }
      )
      .catch(error => {
        this.setState({error});
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState({username : event.target.value})}
          type="text"
          placeholder="Username"
        />
        <input
          value={email}
          onChange={event => this.setState({email : event.target.value})}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState({passwordOne: event.target.value})}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState({passwordTwo: event.target.value})}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

const mapDispatchToProps = dispatch => bindActionCreators({ signup }, dispatch)

export default connect(null, mapDispatchToProps)(withRouter(SignUpPage));

export {
  SignUpForm,
  SignUpLink,
};