import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {authSetUser} from './../../actions/authUserSet';
import { firebase } from '../../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? onSetAuthUser(authUser)
          : onSetAuthUser(null);
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({onSetAuthUser: authSetUser}, dispatch)
  }

  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;