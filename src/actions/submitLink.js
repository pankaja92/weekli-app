/* eslint-disable no-unused-vars */
import axios from 'axios';

const sumbitLink = link => async () => {
  const response = await axios.post('http://localhost:5000/api/links/addlink', link);
  if (response.status === 200) {
    return true;
  }
  return false;
};

export default sumbitLink;
