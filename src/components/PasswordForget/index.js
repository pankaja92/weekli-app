import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: null,
    };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ email: '', error: null }));
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
