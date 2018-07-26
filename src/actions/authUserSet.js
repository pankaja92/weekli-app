import * as types from '../constants/action_types';

export const authSetUser = user => {
    return {
        type : types.AUTH_USER_SET,
        payload : user
    }
}