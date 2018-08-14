/* eslint-disable no-unused-vars */

import axios from 'axios';

const customize = data => async dispatch => {
  try {
    const response = await axios.post('http://localhost:5000/api/user/update', data);
    return true;
  } catch (error) {
    return error;
  }
};

export default customize;
