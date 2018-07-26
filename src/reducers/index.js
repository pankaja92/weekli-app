import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import linkReducer from './link';
import linksReducer from './links';
import activeUserReducer from './activeUser';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  linkState: linkReducer,
  linksState: linksReducer,
  activeUserState: activeUserReducer,
});

export default rootReducer;
