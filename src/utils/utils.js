import axios from 'axios';

const getMovies = async() => {
    try {
        let res = await axios.get('https://api.tvmaze.com/shows');
        let moviesAllFields = res.data;
    
        let movies = moviesAllFields.map( movie => {
            let obj = {}
            // obj.id = movie.id;
            obj.name = movie.name;
            obj.genres = movie.genres;
            obj.image = movie.image.medium;
            obj.premiered = movie.premiered;
    
            return obj;
        } );
        return [movies[0], movies[1]];
    } catch(err) {
        console.log(err);
    }
}

const getMembers = async() => {
    try {
        let res = await axios.get('https://jsonplaceholder.typicode.com/users');
        let membersAllFields = res.data;
    
        let members = membersAllFields.map( member => {
            let obj = {}
            // obj.id = movie.id;
            obj.name = member.name;
            obj.email = member.email;
            obj.city = member.address.city;
    
            return obj;
        } );
        return [members[0], members[1]];
    } catch(err) {
        console.log(err);
    }
   
}

export default {getMovies, getMembers};