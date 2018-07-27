/* eslint-disable no-unused-vars */

import axios from 'axios';

const customize = data => async dispatch => {
  try {
    const response = await axios.post('http://localhost:5000/api/user/update', data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export default customize;
