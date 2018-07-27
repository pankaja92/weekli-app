import React, { Component } from 'react';
import TimePicker from 'react-times';
import PropTypes from 'prop-types';

// use material theme
import 'react-times/css/classic/default.css';

class Time extends Component {
  shouldComponentUpdate(nextPorps) {
    const { toChildHour, toChildMin } = this.props;
    if (toChildHour !== nextPorps.toChildHour && toChildMin !== nextPorps.toChildMin) {
      return true;
    }
    return false;
  }

  onTimeChange = options => {
    const { getTime } = this.props;
    const { meridiem, ...time } = options;
    getTime(time);
  };

  render() {
    const { toChildHour, toChildMin } = this.props;
    const time = `${toChildHour}:${toChildMin}`;
    return (
      <div>
        <TimePicker theme="classic" time={time} onTimeChange={this.onTimeChange} />
      </div>
    );
  }
}

Time.propTypes = {
  getTime: PropTypes.func.isRequired,
  toChildHour: PropTypes.number.isRequired,
  toChildMin: PropTypes.number.isRequired,
};

export default Time;
