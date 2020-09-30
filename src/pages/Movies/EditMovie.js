import React, { useState } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

import {DropdownButton, Dropdown, Button } from 'react-bootstrap';

import { updateMovieDataInFirebase } from '../../firebase/firebase.utils';

const EditMovie = () => {

    const location = useLocation();
    const movie = location.state.movie;

    const [name, setName] = useState(movie.name);
    const [image, setImage] = useState(movie.image); // medium
    const [premiered, setPremiered] = useState(movie.premiered);
    const [genres, setGenres] = useState(movie.genres);

    const [changed, setChanged] = useState(false);

    const handleChanges = (e) => {
        e.preventDefault();
        updateMovieDataInFirebase(movie.id, name, image, premiered, genres);
        alert('Details changed successfully');
        setChanged(true);
    }   

    const changeGenres = (e) => {
        let genresStr = e.target.value;
        var temp = genresStr.split(",");
        var res = temp.map( movieName => {
            let name = capitalizeFirstLetter(movieName);
            return name;
        } )
        setGenres(res);
    }

    const  capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    return(
        <div>
        <h2>Movies</h2>
        <h4>Edit movie: {name}</h4>
             <div className="container py-3">
                 <div className="row">
                     <div className="mx-auto col-sm-6">
                         <div className="card bg-dark" >
                             <div className="card-header">
                                 <h4 className="mb-0">Movie Information</h4>
                             </div>
                             <div className="card-body">
                                 <form className="form" role="form" autoComplete="off">
                                     <div className="form-group row">
                                         <label className="col-lg-3 col-form-label form-control-label">Name: </label>
                                         <div className="col-lg-9">
                                             <input className="form-control" type="text" value={name} onChange={ e => setName(e.target.value)} />
                                         </div>
                                     </div>
                                     <div className="form-group row">
                                         <label className="col-lg-3 col-form-label form-control-label">Iamge Url: </label>
                                         <div className="col-lg-9">
                                             <input className="form-control" type="text" value={image} onChange={ e => setImage(e.target.value)} />
                                         </div>
                                     </div>

                                     <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Premiered: </label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="date" value={premiered} onChange={ e => setPremiered(e.target.value)} />
                                        </div>
                                     </div>
                                 
                                     <div className="form-group row">
                                        <label className="col-lg-3 col-form-label form-control-label">Genres: </label>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" value={ genres.map( genr => genr) } 
                                            onChange={ e => changeGenres(e)} />
                                        </div>
                                    </div>

                                     <div className="form-group row">
                                         <label className="col-lg-3 col-form-label form-control-label"></label>
                                         <div className="col-lg-9">
                                             <input type="button" className="btn btn-danger" value="Save Changes" onClick={ e => handleChanges(e) } />
                                             <Link to='allmovies' className="btn btn-secondary">Cancel</Link>
                                             { changed ? <Redirect to='allmovies' /> : null}
                                         </div>
                                     </div>
                                 </form>
                             </div>
                         </div>
             </div>
         </div>
     </div>
     </div>
    )
}

export default EditMovie;

// <DropdownButton className="btn btn-danger btn-sm rounded-0"
// title='See all' size="sm" variant='Warning'>
// { 
//    genres.map( (genr, index) => {
//        return <Dropdown.Item key={index} eventKey={index}>{genr}</Dropdown.Item>
//    } )
// }

// </DropdownButton>
// <Button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" 
// data-placement="top" title="Add"  size="sm"
// >
// <i className="fa fa-plus" aria-hidden="true"></i>
// </Button>