import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { addMovie } from '../../redux/movies/movies.actions';
import { addDocumentToCollection } from '../../firebase/firebase.utils';
import validator from 'validator';
import BackButton from '../../components/BackButton';

const AddMovie = () => {
    const [name, setName] = useState('');
    const [genres, setGenres] = useState([]);
    const [image, setImage] = useState('');
    const [premiered, setPremiered] = useState(new Date());
    const [movieToAdd, setMovieToAdd] = useState({});

    const [changed, setChanged] = useState(false);

    const moviesList = useSelector(state => state.movies.movies);

    const dispatch = useDispatch();

    const changeName = (e) => {
        let flag = false;
        moviesList.map( movie => {
            if(movie.name.toLowerCase() === e.target.value.toLowerCase())
                flag = true;
        })
        if(!flag)
            setName(e.target.value)
        else
            alert('The movie already exist')
    }

    const changeGenres = (e) => {
        let genresStr = e.target.value;
        var res = genresStr.split(",");
        setGenres(res);
    }

    const isURLValid = (url) => {
        return validator.isURL(url);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(image && isURLValid(image)))
            alert('You must insert a URL')
        else if(!(name && genres && image && premiered))
            alert('You must fill in all the fields!');
        else {
            setMovieToAdd({name, genres, image, premiered});
            setChanged(true);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setName('');
        setGenres([]);
        setImage('');
        setPremiered(new Date());
        setChanged(true);
    }

    useEffect( () => {   
        async function fetchMyAPI() {
            await addDocumentToCollection('movies',movieToAdd);
            
        }
        if(Object.keys(movieToAdd).length !== 0){
            dispatch(addMovie(movieToAdd));
            fetchMyAPI()
        }
    }, [movieToAdd]);

    return (
        <div>
            <br/><br/><br/>
            <h1 className="text-center"> Movies </h1>
            <div className="container py-3">
                <div className="row">
                    <div className="mx-auto col-sm-6">
                        <div className="card bg-dark" >
                            <div className="card-header">
                                <h4 className="mb-0">Add new movie</h4>
                            </div>
                            <div className="card-body">
                                <form className="form" autoComplete="off">
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={name} 
                                                    onChange={ e => changeName(e) } />
                                            </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Genres</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" value={genres}
                                                onChange={ e => changeGenres(e)} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Image Url </label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" value={image}
                                                onChange={ e => setImage(e.target.value) } />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Premiered</label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="date" value={premiered}
                                                onChange={ e => setPremiered(e.target.value) } />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label"></label>
                                        <div className="col-lg-9">
                                            <input type="button" className="btn btn-danger" value="Add movie" onClick={e => handleSubmit(e)} />
                                            <button type="submit" className="btn btn-secondary" onClick={ e => handleCancel(e) }>Cancel</button>
                                            { changed ? <Redirect to='allmovies' /> : null}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BackButton children='Go back'/>
        </div>
    )
}

export default AddMovie;


// <form>
// <div className="form-group">
//     <br/><br/><br/>
//     <h3>Add new movie:</h3><br /><br />
//     <label>
//         Name: 
//         <input type="text" name="name" value={name} onChange={ e => changeName(e) } />
//     </label><br />
//     <label>
//         Genres: 
//         <input type="text" name="genres" value={genres} onChange={ e => changeGenres(e) } />
//     </label><br />
//     <label>
//         Image Url: 
//         <input type="url" name="image" value={image} onChange={ e => setImage(e.target.value) } />
//     </label><br />
//     <label>
//         Premiered: 
//         <input type="date" name="premiered" value={premiered} onChange={ e => setPremiered(e.target.value) } />
//     </label><br />
//     <button type="submit" className="btn btn-danger" onClick={e => handleSubmit(e) }>Save</button>
//     <button type="submit" className="btn btn-danger" onClick={ e => handleCancel(e) }>Cancel</button>
//     { changed ? <Redirect to='allmovies' /> : null}
// </div>
// </form>