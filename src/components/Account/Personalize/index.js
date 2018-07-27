import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import customize from '../../../actions/customize';
import login from '../../../actions/login';
import Time from './Time';
import Weekdays from './Weekdays';

const calculateLocalTime = ({ date, hour, minute }) => {
  date = parseInt(date, 10);
  const now = new Date();
  const diff = now.getTimezoneOffset();
  const utctime = parseInt(hour, 10) * 60 + parseInt(minute, 10);
  const localtime = utctime - diff;
  let correcttimeinmin = '';
  // if there's a time diff in local and utc
  if (diff !== 0) {
    // if time in local less than 0
    if (localtime < 0) {
      // if day is not Sunday ( 0 )
      if (date !== 0) {
        date -= 1;
      } else date = 6;
      // if localtime is - we should add 1440 (24 hours) to get the exact time in minutes in previous day
      correcttimeinmin = 1440 - localtime;
    } else if (localtime >= 0 && localtime < 1440) {
      correcttimeinmin = localtime;
    } else {
      if (date !== 6) {
        date += 1;
      } else date = 0;
      // if localtime is + and higher than 1440 (24 in minutes) we should add substract 1440 from time to get the exact time in minutes in previous day
      correcttimeinmin = localtime - 1440;
    }
    hour = parseInt(correcttimeinmin / 60, 10);
    minute = correcttimeinmin % 60;
    const sendObj = {
      getdate: date,
      gethour: hour,
      getMinute: minute,
    };
    return sendObj;
  }
  return {};
};

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
        <Weekdays getDay={this.getday} toChildDay={day} />
        <Time getTime={this.gettime} toChildHour={hour} toChildMin={minute} />
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
