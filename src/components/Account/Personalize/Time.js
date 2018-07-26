import React, { Component } from 'react';
import TimePicker from 'react-times';
 
// use material theme
import 'react-times/css/classic/default.css';

class Time extends Component {
    onTimeChange = options => {
        const { meridiem, ...time } = options;
        this.setState({ time });
        this.props.getTime(time);
    }

    shouldComponentUpdate(nextPorps){
        if(this.props.toChildHour!==nextPorps.toChildHour && this.props.toChildMin !== nextPorps.toChildMin){
            return true;
        }
        return false;
    }
	
    render(){
        const time = `${this.props.toChildHour}:${this.props.toChildMin}`
        return ( 
            <div> 
                <TimePicker 
                    theme="classic" 
                    time={time} 
                    onTimeChange={this.onTimeChange} /> 
            </div> 
        )
    }
}

export default Time;