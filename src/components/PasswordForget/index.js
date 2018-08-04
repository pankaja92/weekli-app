import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import emailValidator from '../../utils/emaiValidator';

const styles = {
  input: {
    fontFamily: "'PT Sans', sans-serif",
    fontSize: '18px',
    color: 'var(--white)',
    marginBottom: '10px',
  },
};

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

const PasswordForgetPage = props => (
  <div className="Form-container">
    <h1>Reset Password</h1>
    <PasswordForgetForm {...props} />
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
    const { classes } = this.props;
    const isInvalid = emailValidator(email) === false;

    return (
      <form onSubmit={this.onSubmit} className="Form">
        <TextField
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email Address"
          InputProps={{
            className: classes.input,
          }}
        />
        <Button disabled={isInvalid} type="submit" className="button">
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

PasswordForgetForm.propTypes = { classes: PropTypes.shape({}).isRequired };

const PasswordForgetLink = () => (
  <P>
    <StyledLink to={routes.PASSWORD_FORGET}>Forgot Password?</StyledLink>
  </P>
);

export default withStyles(styles)(PasswordForgetPage);

export { PasswordForgetForm, PasswordForgetLink };
