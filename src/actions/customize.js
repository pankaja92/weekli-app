import axios from 'axios';

export const customize = (data) => {
    return async dispatch => {
        try {
            console.log(data);
            const response = await axios.post('http://localhost:5000/api/user/update', data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}