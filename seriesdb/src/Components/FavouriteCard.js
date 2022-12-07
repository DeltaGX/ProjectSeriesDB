import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


export default (function Favcard({ index, movieData}){
  const navigate = useNavigate();
  const [type,settype] = useState();
  
  const handleClick= async(e)=>{
    console.log(movieData.ContType);
    if (movieData.ContType == undefined){
      movieData.ContType = localStorage.getItem('contenttype')
    } 
    localStorage.setItem('contenttype',movieData.ContType)
    navigate(`/${movieData.ContType}/${movieData.Contid}`);
  }

  return (
        <div className="px-6 items-center">
          <img alt='404 Not Found' 
          src={`https://image.tmdb.org/t/p/w500${movieData.ContPoster}`}
          onClick={handleClick}
          className='w-48 h-60 mt-4'></img>
          <p className='w-48 text-center font-mono text-xl'>{movieData.ContName}</p>
          <p className='w-48 text-center font-mono'>UserRating: {movieData.UserScore}</p>
          <p className='w-48 text-center'> Note: </p>
          <p className='w-48 h-16 text-center font-mono overflow-auto break-all'> {movieData.Note}</p>
        </div>
    )
});

