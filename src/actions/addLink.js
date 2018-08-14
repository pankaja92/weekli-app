import axios from 'axios';
import * as types from '../constants/action_types';

const addLink = link => async dispatch => {
  try {
    const response = await axios.post('http://localhost:5000/api/links/addlink', link);
    const { data } = await response;
    return dispatch({
      type: types.ADD_LINK,
      payload: data,
    });
  } catch (error) {
    return error;
  }
};

export default addLink;
