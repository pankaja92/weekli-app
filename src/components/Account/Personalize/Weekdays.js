import React, { Component } from "react";
import Select from 'react-select';
// import 'react-select/dist/react-select.css';

const calender = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
]

class Weekdays extends Component{

    handleChange = (day) => {
        this.setState({ day });
        this.props.getDay(day);
    }

    shouldComponentUpdate(nextPorps){
        if(this.props.toChildDay!==nextPorps.toChildDay){
            return true;
        }
        return false;
    }

    render() {
        const dayNumber = this.props.toChildDay;
        const day = calender[dayNumber]
        return (
            <Select
                value={day}
                onChange={this.handleChange}
                options={calender}
            />
        );
    }

};

export default Weekdays;