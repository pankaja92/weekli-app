import axios from 'axios';

export const signup = (user) => {
    return async dispatch => {
        console.log(user);
        const response = await axios.post('http://localhost:5000/api/user/register', user)
        console.log(response);
        if(response.status ===200){
            return true;
        }
    }
}
