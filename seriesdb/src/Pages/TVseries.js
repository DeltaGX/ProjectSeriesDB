import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesbyGenre, getGenres } from "../Context/FetchContext";
import SelectGenre from "../Components/SelectGenre";
import NormalSlider from "../Components/NormalSlider";

function TVSeries() {
  const movies = useSelector((state) => state.getMovie.movies);
  const genres = useSelector((state) => state.getMovie.genres);
  const genresLoaded = useSelector((state) => state.getMovie.genresLoaded);
  // const dataLoading = useSelector((state) => state.Fetch.dataLoading);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMoviesbyGenre({ type: "tv" }));
    }
  }, [genresLoaded]);

  return (
    <div className='bg-Lightblue min-h-screen'>
      <Navbar />
      <div>
      <header className="text-6xl text-center pt-5 h-24 bg-PYellow">
        Top TVSeries 
      </header>
      
        {movies.length ? (
            <NormalSlider movies={movies}/>
        ) : (
          <h1>
            Having Problem load movie data, try again later!
          </h1>
        )}
      </div>
    </div>
  );
}

export default TVSeries;