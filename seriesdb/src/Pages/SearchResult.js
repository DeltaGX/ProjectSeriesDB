import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
// import { useSelector} from "react-redux";
// import { fetchSearch } from "../Context/FetchContext";
// import SelectGenre from "../Components/SelectGenre";
import NormalSlider from "../Components/NormalSlider";
import axios from 'axios';
import {TMDB_BASE_URL, API_KEY} from '../Utils/constant';

function SearchResult() {
const navigate =useNavigate()
// const movies = useSelector((state) => state.getMovie.movies);
const [movieInfo, setmovieInfo] = useState([]);
const [search, setsearch] = useState([]);
const [type, settype] = useState([]);
const conttype = localStorage.getItem('contenttype')
  const handleSearch = async () => {
    try {
      const search = localStorage.getItem('search')
      const res = await axios.get(`${TMDB_BASE_URL}/search/${conttype}?api_key=${API_KEY}&query=${search}`);
      setmovieInfo(res.data.results);
      setsearch(search);
      if(conttype === 'tv'){
        settype('TVSeries')
      } 
      if(conttype === 'movie'){
        settype('Movies')
      }
    } catch (err) {
        console.log(err)
    }
  }
  useEffect(() => {
    handleSearch();
    
  }, [navigate]);



  return (
    <div className='bg-Lightblue min-h-screen'>
      <Navbar />
      <div className=' pt-20' >
      <header className="text-6xl text-center pt-5 h-24 bg-PYellow">
        Search Result of {search} from {type} 
      </header>
      
        {movieInfo && movieInfo.length ? (
            <NormalSlider movies={movieInfo} />
        ) : (
          <h1 className ='text-center '>
            Having Problem load data, try again later!
          </h1>
        )}
      </div>
    </div>
  );
}

export default SearchResult;