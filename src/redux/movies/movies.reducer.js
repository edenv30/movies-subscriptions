import MoviesActionsTypes from './movies.types';

const INITIAL_STATE = {
    movies: []
}

const moviesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MoviesActionsTypes.SET_MOVIES_FROM_FIRE_STORE:
            return {
                ...state,
                movies: action.payload
            }
        case MoviesActionsTypes.ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies, action.payload]
            }
        default: 
            return state;
    }
}

export default moviesReducer;