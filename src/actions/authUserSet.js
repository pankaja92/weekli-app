import * as types from '../constants/action_types';

const authSetUser = user => ({
  type: types.AUTH_USER_SET,
  payload: user,
});

export default authSetUser;
