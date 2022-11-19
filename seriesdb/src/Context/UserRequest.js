import { API_KEY } from "../Utils/constant";
import { TMDB_BASE_URL } from "../Utils/constant";

const UserRequest = {
    fetchPopularMovie:`${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`, //&page=1
    fetchTopRatedMovie:`${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,//&page=1
    fetchSingleMovie:`${TMDB_BASE_URL}/movie/`+   +`?api_key=${API_KEY}&language=en-US`,//&page=1
    fetchPopularSeries:`${TMDB_BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`, //&page=1
    fetchTopRatedSeries:`${TMDB_BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,//&page=1
    fetchSingleSeries:`${TMDB_BASE_URL}/tv/`+   +`?api_key=${API_KEY}&language=en-US`,//&page=1
    QuerySearchMovie:`${TMDB_BASE_URL}/search/movie?api_key={api_key}&query=`, //insert searchbar
    QuerySearchSeries:`${TMDB_BASE_URL}/search/tv?api_key={api_key}&query=`, //insert searchbar
    QuerySearch:`${TMDB_BASE_URL}/search/`
}

export default UserRequest