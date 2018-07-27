import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

// import 'react-select/dist/react-select.css';

const calender = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

class Weekdays extends Component {
  shouldComponentUpdate(nextPorps) {
    const { toChildDay } = this.props;
    if (toChildDay !== nextPorps.toChildDay) {
      return true;
    }
    return false;
  }

  handleChange = day => {
    const { getDay } = this.props;
    getDay(day);
  };

  render() {
    const {
      toChildDay: { dayNumber },
    } = this.props;

    const day = calender[dayNumber];
    return <Select value={day} onChange={this.handleChange} options={calender} />;
  }
}

Weekdays.propTypes = {
  getDay: PropTypes.func.isRequired,
  toChildDay: PropTypes.number,
};

Weekdays.defaultProps = {
  toChildDay: 5,
};

export default Weekdays;
