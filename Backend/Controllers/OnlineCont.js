let api_key='cc9998af9f9a12b4c78dcb7f12951729';
let img_url='https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg';
let genres_list_http='https://api.themoviedb.org/3/genre/movie/list?';
const {OnlineCont} = require("../models/OnlineCont.js");


const fetchMoviesListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
    }))
    .then(res => res.json())
    .then(data => {
        makeCategoryElement(`${genres}_movies`, data.results);
    })
    .catch(err =>  console.log(err));
}

fetch(genres_list_http + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name);
    })
});

export const fetchOnlineCont = async (req, res, next) => {
    const newOnlineCont = new OnlineCont(req.body);
    fetch()
};