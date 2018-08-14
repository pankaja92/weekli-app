import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const { history } = this.props;
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      const { authUser } = this.props;
      return authUser ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });

  WithAuthorization.propTypes = {
    authUser: PropTypes.shape({}),
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  };

  WithAuthorization.defaultProps = {
    authUser: null,
  };

  return compose(
    withRouter,
    connect(mapStateToProps)
  )(WithAuthorization);
};

export default withAuthorization;
