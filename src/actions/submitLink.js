import axios from 'axios';

export const sumbitLink = (link) => {
    return async dispatch => {
        console.log(user);
        const response = await axios.post('http://localhost:5000/api/links/addlink', link)
        console.log(response);
        if(response.status ===200){
            return true;
        }
    }
}
