import * as types from '../constants/action_types';
import axios from 'axios';

export const getLinks = (userid) => {
    return async dispatch => {        
        try {
            const response = await axios.get('http://localhost:5000/api/links/getlinks', 
                                            { params : { userid } }
                                        )
            const { data } = await response;
            dispatch({
                type : types.GET_LINKS,
                payload : data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
