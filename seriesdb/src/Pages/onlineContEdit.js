import NavBar from '../Components/NavBar.js';
import React,{useState, useContext,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { fetchMovies, getGenres,removeMovieFromLiked } from "../Context/FetchContext";
import { AuthContext } from '../Context/AuthContext.js';
import axios from 'axios';
import { API_KEY,TMDB_BASE_URL } from "../Utils/constant";


export default React.memo(function OnlineContEdit({ }) {
        const navigate = useNavigate();
        const [movieInfo, setmovieInfo] = useState([]);
        const [userNote, setuserNote] = useState([])
        const { user } = useContext(AuthContext);
        async function fetchContent() {
             try {  
              const res = await axios.get(`${TMDB_BASE_URL}${window.location.pathname}?api_key=${API_KEY}&language=en-US`);
              console.log(res.data);
              setmovieInfo(res.data);
             } catch (err) {
              console.log(err)
             }
           }
        async function fetchuserNote() {
            try { 
             const res = await axios.get(`http://localhost:4000/users/${user._id}/usernote`, { withCredentials: true });
             const note = res.data.find(({Contid}) => Contid === movieInfo.id)
             console.log(note);
             setuserNote(note);
            } catch (err) {
             console.log(err)
            }
          }
        useEffect(() => {
           fetchContent();
          }, []);
          
        useEffect(() => {
           if(user)
           fetchuserNote();
           }, [movieInfo.id]);
        
    return(
        <div style={{backgroundImage: (`https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`)}}>
            <NavBar />
                <div className="w-3/4 h-20 bg-PYellow m-auto mt-10 flex items-center"> {/* YellowSquare */}
                    <p className='ml-8 text-xl font-bold'>{movieInfo.name || movieInfo.title || movieInfo.original_name || movieInfo.original_title}</p>
                </div>
                <div className="relative w-3/4 h-screen mb-20 bg-gray-100 m-auto flex flex-wrap "> {/* BigSquare */}
                    <img alt='' src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`} className='w-48 h-60 ml-5 mt-10'/>
                    <div className='absolute top-72 left-8'>
                        <p className='text-2xl ml-7 '>Your Status</p>
                        <p className='text-xl'>Status:</p>
                        <p className='text-xl'>Ep Seen:{userNote?.EPseen}</p>
                        <p className='text-xl'>Your Score:{userNote?.Score}</p>
                        <p className='text-xl'>Your Note: {userNote?.Note}</p>
                        <p className='text-blue-500 underline text-center' >Edit</p>
                        {!(userNote?.isFavourite) ? <p className='text-blue-500 underline text-center'>Not Favourite</p>
                        :<p className='text-blue-500 underline text-center'>Already Favourite</p>}
                    </div>
                    <div className='justify-end'>
                        <div className="absolute w-4/5 h-screen mb-20 ml-5 bg-gray-200 flex flex-wrap space-y-4"> {/* SmallSquare */}
                            <p className='relative ml-6 mt-4 h-10 w-full text-xl'>Status and Information:
                                <p className='absolute top-7'>Synopsis:</p>
                                <p className='absolute top-14 w-4/5 h-40 overflow-auto fonts-sans'>{movieInfo?.overview}</p>
                            </p>
                            <div className='ml-5 mb-36 h-20'>
                                <p className="text-2xl">Information:</p>
                                <p className="text-xl">Genre:{movieInfo?.genres?.map((genres) =>
                                                    <p key={genres.ID}>{genres.name}</p>)}</p>
                                <p className='text-xl'>Status: {movieInfo.status}</p>
                                <p className='text-xl'>Episode: 1</p>
                                <p className='text-xl'>Aired: 19 september 2021</p>
                                <p className='text-xl'>Studio: {movieInfo?.production_companies?.map((production_companies) =>
                                                    <p key={production_companies.ID}>{production_companies.name}</p>)}</p>
                                <p className='text-xl'>Country: {movieInfo?.production_countries?.map((production_countries) =>
                                                    <p key={production_countries.ID}>{production_countries.name}</p>)}</p>
                            </div>
                            <div className='pl-24 h-20 ml-2'>
                                <p className='text-2xl'>Link:</p>
                                {movieInfo?.imdb_id ? <a href={`https://www.imdb.com/title/${movieInfo.imdb_id}`}>
                                <p className='text-blue-500 underline text-3xl'>IMDB</p>
                                </a> : <a href={`https://www.imdb.com/find?q=${movieInfo.name|| movieInfo.title || movieInfo.original_name || movieInfo.original_title}`}>
                                    <p className='text-blue-500 underline text-3xl'>IMDB</p></a>}
                                <p className='text-xl'>score:{movieInfo?.vote_average} </p>
                                <p className='text-xl'>from:{movieInfo?.vote_count} vote</p>
                            </div>
                            <div className='pl-20'>
                                <div className='ml-5 h-20'>
                                    <p className='text-3xl'>Can be watch on:</p>
                                    <p className='text-blue-500 underline text-3xl'>Theater</p>
                                <div className='h-20'>
                                    <p className='text-3xl'>Reviews:</p>
                                    <Link to={`/Movies/${movieInfo.id}/Reviews`}>
                                        <p className='text-blue-500 underline text-3xl'>Read All Review Here</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

