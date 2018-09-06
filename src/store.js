import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import normalize from './normalize';
import reducers from './reducers';

const middlewares = [thunk];

const logger = createLogger({
  level: 'info',
  collapsed: true,
  timestamp: false,
});

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

export default gon => createStore(
  reducers,
  normalize(gon),
  enhancer,
);
