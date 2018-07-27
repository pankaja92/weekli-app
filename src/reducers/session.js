import * as types from '../constants/action_types';

const INITIAL_STATE = {
  authUser: null,
};

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.AUTH_USER_SET: {
      return { authUser: action.payload };
    }
    default:
      return state;
  }
}

export default sessionReducer;
