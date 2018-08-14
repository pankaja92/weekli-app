/* eslint-disable no-unused-vars */

import axios from 'axios';

const signup = user => {
  const response = axios.post('http://localhost:5000/api/user/register', user);
  if (response.status === 200) {
    return true;
  }
  return false;
};

export default signup;
