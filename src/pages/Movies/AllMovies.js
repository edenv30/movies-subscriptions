import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import MovieCard from './MovieCard';

import BackButton from '../../components/BackButton';

const AllMovies = ({searchField}) => {

    const moviesList = useSelector(state => state.movies.movies);

    const [moviesListTemp, setmoviesListTemp] = useState(moviesList);
    

    useEffect( ()=> {
        try {
            if(searchField) {
                const filteredMovies = moviesList.filter( (movie) => 
                movie.name.toLowerCase().includes(searchField.toLowerCase()) 
                );
                setmoviesListTemp(filteredMovies);
            }
           
        }catch(err) {
            console.log(err);
        }
       
    }, [searchField]);

    useEffect( () => {
        setmoviesListTemp(moviesList);
    },[moviesList])

    return (
        <div>
            <div className="container row mt-5 justify-content-center">
                {
                    (moviesListTemp) ? 
                    (moviesListTemp.map( movie => {
                        return (
                            <div key={movie.id}>
                                <MovieCard movie={movie} />
                            </div>
                        )
                    } )) : null
            }
            </div>
            
            <BackButton children='Go back'/>

        </div>
    )
}

export default AllMovies;

// <ul style={{listStyleType: "none"}}>
// {movie.genres.map(
//     (gener, index) => <li key={index}> {gener} </li>
// )} 
// </ul>