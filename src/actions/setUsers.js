import * as types from '../constants/action_types';

const setUsers = users => ({
  type: types.USERS_SET,
  payload: users,
});

export default setUsers;
