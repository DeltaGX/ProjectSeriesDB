import React from 'react';
import {useNavigate} from 'react-router-dom';


export default React.memo(function Card2({ index, movieData}){
  const navigate = useNavigate();
  if(movieData.type == undefined) {
    movieData.type = 'movie'}
  
  return (
        <div className="px-6 items-center">
          <img alt='404 Not Found' 
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          onClick={() => {navigate(`/${movieData.type}/${movieData.id}`)}}
          className='w-48 h-60 ml-4 mt-4 font-mono'></img>
          <p>test</p>
        </div>
    )
});

