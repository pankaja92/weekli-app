import axios from 'axios';
import * as types from '../constants/action_types';

const getLinks = userid => async dispatch => {
  try {
    const response = await axios.get('http://localhost:5000/api/links/getlinks', {
      params: { userid },
    });
    const { data } = await response;
    return dispatch({
      type: types.GET_LINKS,
      payload: data,
    });
  } catch (error) {
    return error;
  }
};

export default getLinks;
