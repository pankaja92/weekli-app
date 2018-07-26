import * as types from '../constants/action_types';
import axios from 'axios';

export const addLink = (link) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/links/addlink', link)
            const { data } = await response;
            dispatch ({
                type : types.ADD_LINK,
                payload : data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

