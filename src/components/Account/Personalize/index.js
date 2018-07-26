import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { customize } from '../../../actions/customize';
import { login } from '../../../actions/login';
import Time from './Time';
import Weekdays from './Weekdays';

const calculateLocalTime = ({date,hour,minute}) => {
    date = parseInt(date, 10);
    const now = new Date();
    const diff = now.getTimezoneOffset();
    let utctime = parseInt(hour, 10) * 60 + parseInt(minute, 10);
    let localtime = utctime - diff;
    let correcttimeinmin = '';
    //if there's a time diff in local and utc
    if(diff !== 0) {
        //if time in local less than 0
        if (localtime<0){
        //if day is not Sunday ( 0 ) 
        if(date !== 0){
            date = date - 1;
        }
        else date = 6;
        //if localtime is - we should add 1440 (24 hours) to get the exact time in minutes in previous day
        correcttimeinmin = 1440 - localtime;
        }
        else if (localtime>=0 & localtime<1440){
        correcttimeinmin = localtime;
        }
        else {
        if(date !== 6){
            date = date + 1;
        }
        else date = 0;
        //if localtime is + and higher than 1440 (24 in minutes) we should add substract 1440 from time to get the exact time in minutes in previous day
        correcttimeinmin = localtime - 1440;
        }
        hour = parseInt(correcttimeinmin/60, 10);
        minute = correcttimeinmin%60;
        const sendObj = {
            getdate : date,
            gethour : hour,
            getMinute : minute
        }
        return sendObj ;
    }
}

class Personalize extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : {
                hour : 17,
                minute:0,
                day : 6,
                diff : '',
                user: ''
            }
        }
    }

    getAndCalculate = async() => {
        await this.props.getdata(this.props.user);
        const { date, hour, minute } = await this.props.activeUser;
        const { getdate, gethour, getMinute } = calculateLocalTime({date, hour, minute});
        this.setState(prevState => ({ 
            data : {
                ...prevState.data,
                day : getdate,
                hour : gethour,
                minute : getMinute
            }
         }), () => {
             console.log('Basic');
             console.log(this.state.data)
         }
        ) 
    }

    componentDidMount(){
        this.getAndCalculate();       
    }

    getday = day => this.setState(prevState => ({ 
        data : {
            ...prevState.data,
            day
        }
     })
    );
    
    gettime = time => {
        let { hour , minute } = time;
        hour = parseInt(hour, 10)
        minute = parseInt(minute, 10);
        this.setState(prevState => ({
            data : {
                ...prevState.data,
                hour,
                minute
            }
        }))
    };

    saveData = () => {
        const now = new Date();
        const diff = now.getTimezoneOffset();
        this.setState(prevState => ({ 
            data : {
                ...prevState.data,
                diff,
                user : this.props.user
            }
         }), () => this.props.customize(this.state.data)
        )
    }

    render(){
        return(
            <div>
                <Weekdays getDay={this.getday} toChildDay={this.state.data.day}/>
                <Time getTime={this.gettime} toChildHour={this.state.data.hour} toChildMin={this.state.data.minute} />
                <button onClick={this.saveData} >Save </button>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return { 
        user : state.sessionState.authUser.uid,
        activeUser : state.activeUserState
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ customize, getdata : login }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Personalize);