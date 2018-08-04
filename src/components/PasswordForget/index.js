import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import emailValidator from '../../utils/emaiValidator';

const P = styled.p`
  margin-bottom: 0;
`;

const Button = styled.button`
  margin: 10px 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 400;
  &:hover {
    color: var(--white);
    font-weight: 600;
    text-decoration: underline;
    text-decoration-style: solid;
    text-decoration-color: var(--white);
  }
`;

const PasswordForgetPage = () => (
  <div className="Form-container">
    <h1>Reset Password</h1>
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

    const isInvalid = emailValidator(email) === false;

    return (
      <form onSubmit={this.onSubmit} className="Form">
        <input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email Address"
        />
        <Button disabled={isInvalid} type="submit" className="button">
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <P>
    <StyledLink to={routes.PASSWORD_FORGET}>Forgot Password?</StyledLink>
  </P>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
