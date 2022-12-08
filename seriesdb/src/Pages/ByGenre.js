import React, { useEffect} from "react";
import Navbar from "../Components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchDatabyGenre, getGenres } from "../Context/FetchContext";
import SelectGenre from "../Components/SelectGenre";
import Slider from "../Components/NormalSlider";

function ByGenre() {
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
      dispatch(fetchDatabyGenre({genres, type: "movie" }));
    }
  }, [genresLoaded]);

  return (
    <div className='bg-Lightblue min-h-screen ' >
      <Navbar />
      <div className='pt-20'>
      <header className="text-6xl text-center pt-5 h-24 bg-PYellow ">
        Trending sort by Genre
      </header>
      <SelectGenre genres={genres} />
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

export default ByGenre;