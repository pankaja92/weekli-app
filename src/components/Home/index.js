import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import setUsers from '../../actions/setUsers';
import addLink from '../../actions/addLink';
import getLinks from '../../actions/getLinks';
import withAuthorization from '../Session/withAuthorization';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: '',
    };
  }

  componentDidMount() {
    const { getLinksFunc, user } = this.props;
    getLinksFunc(user);
  }

  submitLink = () => {
    const { link } = this.state;
    const { user, addLinkFunc } = this.props;
    const obj = {
      url: link,
      userid: user,
    };
    addLinkFunc(obj);
  };

  render() {
    const { links } = this.props;
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <input type="text" onChange={e => this.setState({ link: e.target.value })} />
        <br />
        <button type="button" onClick={this.submitLink}>
          {' '}
          Submit{' '}
        </button>
        <hr />
        {Object.keys(links).length !== 0 ? (
          links.map(link => <p key={link.linkid}>{link.title}</p>)
        ) : (
          <p>Hello</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userState.users,
  user: state.sessionState.authUser.uid,
  links: state.linksState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onSetUsers: setUsers,
      addLinkFunc: addLink,
      getLinksFunc: getLinks,
    },
    dispatch
  );

const authCondition = authUser => !!authUser;

HomePage.propTypes = {
  user: PropTypes.string.isRequired,
  addLinkFunc: PropTypes.func.isRequired,
  getLinksFunc: PropTypes.func.isRequired,
};

export default compose(
  withAuthorization(authCondition),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomePage);
