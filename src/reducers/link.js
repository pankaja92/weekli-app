import * as types from '../constants/action_types';

export default function(state = '', action) {
  switch (action.type) {
    case types.ADD_LINK:
      return action.payload;
    default:
      return state;
  }
}
