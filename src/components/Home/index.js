import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
// import { setUsers } from '../../actions/setUsers';
import { addLink } from '../../actions/addLink';
import { getLinks } from '../../actions/getLinks';
import withAuthorization from '../Session/withAuthorization';

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      link : ''
    }
  }
  componentDidMount(){
    this.props.getLinks(this.props.user);
  }

  submitLink = () => {
    const obj = {
      url : this.state.link,
      userid : this.props.user
    }
    this.props.addLink(obj);
  }

  render() {
    console.log(this.props.links);
    if(Object.keys(this.props.links).length !== 0){
      {this.props.links.map(link => console.log(link))}
    }
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <input type='text' onChange={(e) => this.setState({link : e.target.value})}/>
        <br />
        <button type='button' onClick={this.submitLink} > Submit </button>
        <hr />
        {Object.keys(this.props.links).length !== 0 ? this.props.links.map((link) => <p key={link.linkid}>{link.title}</p>) : <p>Hello</p>} 
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return ({
    // users: state.userState.users,
    user : state.sessionState.authUser.uid,
    links : state.linksState,
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    // onSetUsers : setUsers,
    addLink,
    getLinks,
  }, dispatch)
}

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
