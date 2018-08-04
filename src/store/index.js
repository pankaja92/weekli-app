/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const prodMiddlewares = applyMiddleware(thunk);
const devMiddlewares = applyMiddleware(logger, thunk);

const middlewares = process.env.NODE_ENV === 'production' ? prodMiddlewares : devMiddlewares;

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middlewares
);

export default store;
