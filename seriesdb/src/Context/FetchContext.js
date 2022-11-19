import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { API_KEY, TMDB_BASE_URL, TMDB_genre_list} from "../Utils/constant";

  const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
  };
  
  export const getGenres = createAsyncThunk("getMovie/genres", async () => {
     const { data: { genres },
  } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=cc9998af9f9a12b4c78dcb7f12951729`)
    // console.log(genres);
    return genres;
  });
  
  const getRawDatabyGenre = async (api, genres, paging = false, type) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 80 && i < 12; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      console.log(results)
      createArrayFromRawData(results, moviesArray, genres,type);
    }
    console.log(moviesArray)
    return moviesArray;
  };

  const getData = async (api, paging = false , type) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 80 && i < 12; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      console.log(results)
      createArrayFromData(results, moviesArray, type);
    }
    console.log(moviesArray)
    return moviesArray;
  };
  
  const createArrayFromData = (array, moviesArray, type) => {
    array.forEach((movie) => {
      if (movie.poster_path){
        moviesArray.push({
          id: movie.id,
          original_name: movie.name || movie.title || movie.original_name || movie.original_title,
          poster_path: movie.poster_path ?  movie.poster_path : movie.backdrop_path,
          backdrop_path: movie.backdrop_path,
          genres: movie.genres_ids.slice(0, 3) ,
          type: movie.media_type ? movie.media_type:type,
        }); }
    });
  };
  const createArrayFromRawData = (array, moviesArray, genres, type) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          original_name: movie.name || movie.title || movie.original_name || movie.original_title,
          poster_path: movie.poster_path ?  movie.poster_path : movie.backdrop_path,
          backdrop_path: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
          type: movie.media_type ? movie.media_type : type,
        });
    });
  };
  
  
  export const fetchDatabyGenre = createAsyncThunk(
    "getMovie/genre",
    async ({ genre, type }, thunkAPI) => {
      const {getMovie: { genres }} = thunkAPI.getState();
        return getRawDatabyGenre(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
        genres,
        true,
        type
      );
    }
  );
  
  export const fetchMoviesbyGenre = createAsyncThunk("getMovie/trending",
    async ({ type }, thunkAPI) => {
      const {getMovie: { genres }} = thunkAPI.getState();
      return getRawDatabyGenre(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true,
        type
      );
    }
  );


export const fetchData = createAsyncThunk("getMovie/Data",
async ({ type }, thunkAPI) => {
  const {getMovie: {movies}} = thunkAPI.getState();
  return getData(
    `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
    true,
    type
  );
}
);

// export const fetchHomeData = createAsyncThunk("getMovie/Home",
// async ({ type }, thunkAPI) => {
//   const {getMovie: { movies }} = thunkAPI.getState();
//   return getData(
//     `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
//     true,
//     type
//   );
// }
// );
  
  
  
  const getMovieSlice = createSlice({
    name: "getMovie",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      });
      // builder.addCase(fetchSearch.fulfilled, (state, action) => {
      //   state.movies = action.payload;
      // });
      builder.addCase(fetchData.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      // builder.addCase(fetchHomeData.fulfilled, (state, action) => {
      //   state.movies = action.payload;
      // });
      builder.addCase(fetchMoviesbyGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(fetchDatabyGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
    },
  });
  
  export const store = configureStore({
    reducer: {
      getMovie: getMovieSlice.reducer,
    },
  });
  
  export const { setGenres, setMovies } = getMovieSlice.actions;
