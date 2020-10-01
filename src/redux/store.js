import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
// import thunk from 'redux-thunk';

// const middlewares = [logger];

let middlewares = [];

if (process.env.NODE_ENV === 'development') {
    // middlewares.push(logger);
    middlewares = [...middlewares, logger];
} 

export const store = createStore(rootReducer,  applyMiddleware(...middlewares));
// export const store = createStore(rootReducer,  applyMiddleware(thunk));

export default {store};
