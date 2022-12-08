import React from 'react';
import {useNavigate} from 'react-router-dom';


export default (function Favcard({ movieData}){
  const navigate = useNavigate();
  
  const handleClick= async(e)=>{
    console.log(movieData.ContType);
    if (movieData.ContType === undefined){
      movieData.ContType = localStorage.getItem('contenttype')
    } 
    localStorage.setItem('contenttype',movieData.ContType)
    navigate(`/${movieData.ContType}/${movieData.Contid}`);
  }

  return ( 
        <div className="px-6 items-center hover:bg-yellow-700   " onClick={handleClick}>
          <img alt='404 Not Found' 
          src={`https://image.tmdb.org/t/p/w500${movieData.ContPoster}`}
          className='w-48 h-60 mt-4'></img>
          <p className='w-48 text-center font-mono text-xl h-16 overflow-auto'>{movieData.ContName}</p>
          <p className='w-48 text-center font-mono'>UserRating: {movieData.UserScore}</p>
          <p className='w-48 text-center'> Note: </p>
          <p className='w-48 h-40 text-center font-mono overflow-auto break-all'> {movieData.Note}</p>
        </div>
    )
});

