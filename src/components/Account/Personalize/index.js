import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import customize from '../../../actions/customize';
import login from '../../../actions/login';
import Time from './Time';
import Weekdays from './Weekdays';
import calculateLocalTime from '../../../utils/timeConverter';

class Personalize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        hour: 17,
        minute: 0,
        day: 6,
        diff: '',
        user: '',
      },
    };
  }

  componentDidMount() {
    this.getAndCalculate();
  }

  getAndCalculate = async () => {
    const { getdata, user, activeUser } = this.props;
    await getdata(user);
    const { date, hour, minute } = await activeUser;
    const { getdate, gethour, getMinute } = calculateLocalTime({ date, hour, minute });
    this.setState(
      prevState => ({
        data: {
          ...prevState.data,
          day: getdate,
          hour: gethour,
          minute: getMinute,
        },
      }),
      () => {}
    );
  };

  getday = day =>
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        day,
      },
    }));

  gettime = time => {
    let { hour, minute } = time;
    hour = parseInt(hour, 10);
    minute = parseInt(minute, 10);
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        hour,
        minute,
      },
    }));
  };

  saveData = () => {
    const now = new Date();
    const diff = now.getTimezoneOffset();
    const { user, customizeFunc } = this.props;
    const { data } = this.state;
    this.setState(
      prevState => ({
        data: {
          ...prevState.data,
          diff,
          user,
        },
      }),
      () => customizeFunc(data)
    );
  };

  render() {
    const {
      data: { hour, minute, day },
    } = this.state;
    return (
      <div>
        <div>
          <Weekdays getDay={this.getday} toChildDay={day} />
        </div>
        <div>
          <Time getTime={this.gettime} toChildHour={hour} toChildMin={minute} />
        </div>
        <button type="button" onClick={this.saveData}>
          Save{' '}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.sessionState.authUser.uid,
  activeUser: state.activeUserState,
});

calculateLocalTime.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  minute: PropTypes.string.isRequired,
};

Personalize.propTypes = {
  user: PropTypes.string,
  customizeFunc: PropTypes.func.isRequired,
};

Personalize.defaultProps = {
  user: '',
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ customizeFunc: customize, getdata: login }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personalize);
