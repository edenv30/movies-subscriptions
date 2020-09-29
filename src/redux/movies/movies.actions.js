import MoviesActionsTypes from './movies.types';

export const setMovies = (moviesList) => ({
    type: MoviesActionsTypes.SET_MOVIES_FROM_FIRE_STORE,
    payload: moviesList
});

export const addMovie = (movieToAdd) => ({
    type: MoviesActionsTypes.ADD_MOVIE,
    payload: movieToAdd
})