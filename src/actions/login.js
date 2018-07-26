import axios from 'axios';
import * as types from '../constants/action_types';

export const login = (userid) => {
    return async dispatch => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/login', 
                                           { params : { userid } } )
            const data =response.data[0].row;
            const dayTimeUsername = await data.slice(1, -1).split(",");
            const [date, hour, minute, username] = await [...dayTimeUsername];
            const activeUser = await {
                username,
                date,
                hour, 
                minute
            }

            dispatch({
                type : types.LOGIN,
                payload : activeUser
            })
        } catch (error) {
            console.log(error);
        }
    }
}