import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesbyGenre, getGenres} from "../Context/FetchContext";
import Slider from "../Components/homeSlider";
import { Container } from "reactstrap";

function Homepage() {
  const movies = useSelector((state) => state.getMovie.movies);
  const genres = useSelector((state) => state.getMovie.genres);
  const genresLoaded = useSelector((state) => state.getMovie.genresLoaded);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMoviesbyGenre({ genres, type: "movie" }));
    }
  }, [genresLoaded]);

  return (
    <div className='bg-Lightblue min-h-screen' >
      <Navbar />
      <div>
      <header className="text-6xl text-center pt-5 h-24 bg-PYellow">
        Welcome to SeriesDB!{console.log(movies)}
      </header>
      
        {movies.length ? (
            <Slider movies={movies} />
        ) : (
          <h1>
            Having Problem load movie data, try again later!
          </h1>
        )}
      </div>
    </div>
  );
}

export default Homepage;