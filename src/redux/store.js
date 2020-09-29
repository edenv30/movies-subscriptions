import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
// import thunk from 'redux-thunk';


// if (process.env.NODE_ENV === 'development') {
//     push(logger);
// } 

const middlewares = [logger];

export const store = createStore(rootReducer,  applyMiddleware(...middlewares));
// export const store = createStore(rootReducer,  applyMiddleware(thunk));

export default {store};
