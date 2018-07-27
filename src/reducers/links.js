import * as types from '../constants/action_types';

export default function(state = {}, action) {
  switch (action.type) {
    case types.GET_LINKS:
      return action.payload;
    default:
      return state;
  }
}
