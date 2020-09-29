// represent all the state of the application
import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import moviesReducer from './movies/movies.reducer';
import membersReducer from './members/members.reducer';

const rootReducer = combineReducers ({
    user: userReducer,
    movies: moviesReducer,
    members: membersReducer
});

export default rootReducer;

